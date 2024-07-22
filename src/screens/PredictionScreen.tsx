import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Heart from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-2';
import axios from 'axios';
import SoundPlayer from 'react-native-sound-player';
import {useTranslation} from 'react-i18next';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const db = SQLite.openDatabase('predictions.db');

interface Word {
  word: string;
  translation: string;
}

const PredictionScreen: React.FC = ({route}: any) => {
  const {isEnabled} = route.params || {};
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [shuffledTexts, setShuffledTexts] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [buttonText, setButtonText] = useState<string>('heart-outline');
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const textRef = useRef<Animatable.Text | null>(null);
  const [language, setLanguage] = useState<string>('en');
  const {t} = useTranslation();
  console.log('isEnabled', isEnabled);
  console.log('language', language);
  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          setLanguage(storedLanguage);
        } else {
          setLanguage('en');
        }
      } catch (error) {
        console.error('Error fetching language from storage:', error);
      }
    };

    fetchLanguage();
  }, [isEnabled]);

  useEffect(() => {
    console.log('efef');
    if (language) {
      fetchWordsFromAPI();
    }
  }, [language]);

  const fetchWordsFromAPI = async () => {
    try {
      const response = await axios.get<Word[]>(
        'https://eb-api.una-team.pro/words/predictions',
      );

      const fetchedData: Word[] = response.data.map(item => ({
        word: item.word,
        translation: item.translation,
      }));
      const shuffledData = fetchedData.sort(() => Math.random() - 0.5);

      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Words (id INTEGER PRIMARY KEY AUTOINCREMENT, word TEXT, translation TEXT);',
        );
        shuffledData.forEach(item => {
          tx.executeSql(
            'INSERT INTO Words (word, translation) VALUES (?, ?);',
            [item.word, item.translation],
          );
        });
      });

      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Words;', [], (_, {rows: {_array}}) => {
          const retrievedData = _array.map(
            (item: {word: string; translation: string}) => ({
              word: item.word,
              translation: item.translation,
            }),
          );

          const shuffledRetrievedData = retrievedData.sort(
            () => Math.random() - 0.5,
          );

          setShuffledTexts(shuffledRetrievedData);
          setIsLoading(false);
        });
      });
    } catch (error) {
      console.error('Error fetching words from API:', error);
    }
  };

  const rotationAnimation = useRef(new Animated.Value(0)).current;

  const startRotationAnimation = () => {
    setButtonText('heart-outline');

    Animated.timing(rotationAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      rotationAnimation.setValue(0);
    });
  };

  const handlePress = async () => {
    setIsButtonEnabled(true);
    try {
      await startRotationAnimation();
      if (textRef.current) {
        textRef.current.fadeIn(9000);
      }
      await setCurrentTextIndex(
        prevIndex => (prevIndex + 1) % shuffledTexts.length,
      );
      SoundPlayer.playAsset(require('../../assets/sound3.mp3'));
      setIsButtonEnabled(true);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handlePressMenu = async () => {
    if (buttonText === 'heart') {
      setButtonText('heart-outline');
    } else {
      setButtonText('heart');

      const displayedText =
        language === 'ru'
          ? shuffledTexts[currentTextIndex]?.word
          : shuffledTexts[currentTextIndex]?.translation;

      try {
        let existingTranslations = await AsyncStorage.getItem('savedWords');
        let translations = existingTranslations
          ? JSON.parse(existingTranslations)
          : [];

        if (translations.length >= 100) {
          translations.shift();
        }

        const newWord = {
          text: displayedText || '',
          translation:
            language === 'ru'
              ? shuffledTexts[currentTextIndex]?.translation
              : shuffledTexts[currentTextIndex]?.word,
          date: new Date().toISOString(),
          tag: 0,
          language: language,
        };
        translations.push(newWord);
        await AsyncStorage.setItem('savedWords', JSON.stringify(translations));
      } catch (error) {
        console.error('Error saving word:', error);
      }
    }
    setIsButtonEnabled(false);
  };

  const spin = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const zoomOut = {
    0: {
      opacity: 0,
      scale: 0.5,
      translateX: 0,
    },
    0.5: {
      opacity: 0.7,
      scale: 0.7,
      translateX: 0,
    },
    1: {
      opacity: 1,
      scale: 1,
      translateX: 0,
    },
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#526466" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('title')}</Text>

      <Animatable.Text
        ref={textRef}
        style={[
          styles.containerText,
          language === 'en' ? styles.fontFirst : styles.fontFirstru,
        ]}>
        {language === 'ru'
          ? shuffledTexts[currentTextIndex]?.word
          : shuffledTexts[currentTextIndex]?.translation}
      </Animatable.Text>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View style={[{transform: [{rotate: spin}]}]}>
          <Animatable.Image
            animation={zoomOut}
            source={require('../../assets/ball.png')}
            style={styles.image}
          />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handlePressMenu}
        style={[styles.button, {opacity: isButtonEnabled ? 1 : 0.5}]}
        disabled={!isButtonEnabled}>
        <Text>
          <Heart name={buttonText} color="#7b4c52" style={styles.imageHeart} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#493b48',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 20,
    fontFamily: 'antikvarika1',
    fontSize: 25,
    textAlign: 'center',
    color: '#cec5c0',
    position: 'absolute',
    top: windowHeight * 0,
    shadowColor: '#cec5c0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    textShadowColor: '#fff',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  image: {
    width: windowWidth * 1,
    resizeMode: 'contain',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  containerText: {
    color: '#cec5c0',
    position: 'absolute',
    opacity: 0,
    fontSize: 25,
    width: 260,
    lineHeight: 30,
    textAlign: 'center',
  },
  fontFirst: {
    fontFamily: 'antikvarika2',
  },
  fontFirstru: {
    fontFamily: 'antikvarika2',
  },
  button: {
    position: 'absolute',
    bottom: windowHeight * 0.08,
  },
  imageHeart: {
    fontSize: windowWidth * 0.14,
    textShadowColor: '#7b4c52',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#493b48',
  },
});

export default PredictionScreen;
