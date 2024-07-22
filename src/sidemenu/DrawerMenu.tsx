import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import Description from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/Octicons';
import Document from 'react-native-vector-icons/Ionicons';
import Mail from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import IconButton from '../buttons/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalInstructions from '../modal/ModalInstructions';
import reviewPage from '../utils/reviewApp';
import shareApp from '../utils/shareApp';
import {useTranslation} from 'react-i18next';
import i18n from '../translation/i18n';
import sendEmail from '../utils/sendEmail';

interface DrawerMenuProps {
  setIsEnabled: (enabled: boolean) => void;
  isEnabled: boolean;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({setIsEnabled, isEnabled}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {t} = useTranslation();

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('languageSwitch');
        if (storedState !== null) {
          const newState = JSON.parse(storedState);
          setIsEnabled(newState);
          const newLang = newState ? 'en' : 'ru';
          i18n.changeLanguage(newLang);
          await AsyncStorage.setItem('selectedLanguage', newLang);
          console.log('Selected language:', newLang);
        } else {
          setIsEnabled(true);
          const defaultLang = 'en';
          i18n.changeLanguage(defaultLang);
          await AsyncStorage.setItem('selectedLanguage', defaultLang);
          console.log('Selected language:', defaultLang);
        }
      } catch (error) {
        console.error('Failed to load switch state', error);
      }
    };

    loadSwitchState();
  }, [setIsEnabled]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = async () => {
    const newState = !isEnabled;

    const newLang = newState ? 'en' : 'ru';

    try {
      await i18n.changeLanguage(newLang);
      console.log('Language changed to:', newLang);
      await AsyncStorage.setItem('languageSwitch', JSON.stringify(newState));
      await AsyncStorage.setItem('selectedLanguage', newLang);
    } catch (error) {
      console.error('Failed to save switch state or change language', error);
    }
    setIsEnabled(newState);
  };

  const handleButtonPress = () => {
    const url =
      'https://www.freeprivacypolicy.com/live/fb11492e-6e29-49d1-90dd-af0fc50e0100';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/mo_logo.png')}
          style={styles.image}
        />

        <View>
          <View style={styles.switchContainer}>
            <Text style={styles.textTitle}>ru</Text>
            <ToggleSwitch
              isOn={isEnabled}
              onColor="#836e4b"
              offColor="#836e4b"
              thumbOnStyle={styles.thumbOnStyle}
              thumbOffStyle={styles.thumbOffStyle}
              size="medium"
              onToggle={toggleSwitch}
            />

            <Text style={styles.textTitle}>en</Text>
          </View>
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={
              <ShareIcon
                name="sharealt"
                size={30}
                color="#cec5c0"
                style={styles.icon}
              />
            }
            text={t('share')}
            onPress={shareApp}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Mail name="mail" size={30} color="#cec5c0" style={styles.icon} />
            }
            text={t('connect')}
            onPress={sendEmail}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Star
                name="comment"
                size={30}
                color="#cec5c0"
                style={styles.icon}
              />
            }
            text={t('review')}
            onPress={reviewPage}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Document
                name="document-attach-outline"
                size={30}
                color="#cec5c0"
                style={styles.icon}
              />
            }
            text="Privacy Policy"
            onPress={handleButtonPress}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={
              <Description
                name="script-text-outline"
                size={30}
                color="#cec5c0"
                style={styles.icon}
              />
            }
            text={t('instructions')}
            onPress={openModal}
          />
        </View>
      </View>

      <ModalInstructions visible={modalVisible} onClose={closeModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchContainer: {
    width: '40%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    textShadowColor: '#cec5c0',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontFamily: 'antikvarika1',
    fontSize: 25,
    color: '#778284',
    textAlign: 'center',
    textShadowColor: '#778284',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  thumbOnStyle: {
    backgroundColor: '#c0bfb2',
  },
  thumbOffStyle: {
    backgroundColor: '#c0bfb2',
  },
  button: {
    marginVertical: 10,
  },
});

export default DrawerMenu;
