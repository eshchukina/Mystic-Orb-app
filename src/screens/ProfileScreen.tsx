import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Info from 'react-native-vector-icons/FontAwesome5';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

interface SavedWord {
  date: string;
  text: string;
  tag: number;
}

const ProfileScreen: React.FC = () => {
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSavedWords = async () => {
    try {
      const existingWords = await AsyncStorage.getItem('savedWords');
      if (existingWords) {
        const parsedWords: SavedWord[] = JSON.parse(existingWords);
        const validWords: SavedWord[] = [];
        parsedWords.forEach(word => {
          try {
            const date = new Date(word.date);
            if (!isNaN(date.getTime())) {
              validWords.push(word);
            }
          } catch (error) {
            console.error('Error parsing date:', error);
          }
        });
        setSavedWords(validWords);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading saved words:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    return `${day}.${month}.${year}`;
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedWords();
    }, []),
  );

  const removeWord = async (index: number) => {
    try {
      const updatedWords = [...savedWords];
      updatedWords.splice(index, 1);
      setSavedWords(updatedWords);
      await AsyncStorage.setItem('savedWords', JSON.stringify(updatedWords));
    } catch (error) {
      console.error('Error removing word:', error);
    }
  };

  const toggleTag = async (index: number) => {
    try {
      const updatedWords = [...savedWords];
      updatedWords[index].tag = updatedWords[index].tag === 0 ? 1 : 0;
      setSavedWords(updatedWords);
      await AsyncStorage.setItem('savedWords', JSON.stringify(updatedWords));
    } catch (error) {
      console.error('Error toggling tag:', error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <View style={styles.loadingContainer}>
   <ActivityIndicator size="large" color="#526466" />

      </View>;
    } else if (savedWords.length === 0) {
      return (
        <Text style={styles.wordText}>Here will be your saved predictions</Text>
      );
    } else {
      const wordsWithTag1 = savedWords.filter(word => word.tag === 1).length;

      const renderItem = ({ item, index }: { item: SavedWord; index: number }) => (
        <View style={styles.wordItem}>
          <Pressable
            key={index}
            style={styles.wordItem}
            onPress={() => toggleTag(index)}>
            <Text
              style={[
                styles.wordTextDate,
                item.tag === 1 ? styles.selectedItem : null,
              ]}>
              {formatDate(item.date)}
            </Text>
            <Text
              style={[
                styles.wordText,
                item.tag === 1 ? styles.selectedItem : null,
              ]}>
              {item.text}
            </Text>
            <Pressable onPress={() => removeWord(index)}>
              <Info
                name="broom"
                size={20}
                color="#cec5c0"
                style={item.tag === 1 ? styles.selectedItem : null}
              />
            </Pressable>
          </Pressable>
        </View>
      );

      return (
        <View style={styles.container}>
          <Text style={styles.wordTitle}>
            List of your predictions:
          </Text>
          <FlatList
            data={savedWords}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

          <View>
            <Text style={styles.wordTitle}>
              Predictions that came true: {wordsWithTag1}
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.wrapperInfo}>
        <Animatable.Image
          source={require('../../assets/textlogo.png')}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            alignItems: 'center',
          }}
        />
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#493b48',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#c4661f',
  },


  iconsRow: {
    flexDirection: 'row',
    textAlign: 'center',
    marginTop: isSmallScreen ? heightPercentageToDP('5%') : 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  iconText: {
    color: '#cec5c0',
  },
  wrapperInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#778284',
    borderBottomWidth: 1,
  },
  wordText: {
    fontFamily: 'antikvarika1',
    padding: 5,
    fontSize: 17,
    color: '#cec5c0',
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlign: 'center',
  },
  wordTitle: {
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'antikvarika1',
    fontSize: 25,
    textAlign: 'center',
    color: '#cec5c0',
    textShadowColor: '#cec5c0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  wordTextDate: {
    fontFamily: 'antikvarika1',
    fontSize: 13,
    color: '#cec5c0',
  },
  selectedItem: {
    color: '#836e4b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#493b48',
  },
});

export default ProfileScreen;
