import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import Description from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/AntDesign';
import Star from 'react-native-vector-icons/Octicons';
import Document from 'react-native-vector-icons/Ionicons';
import Mail from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import IconButton from '../buttons/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DrawerMenuProps {}

const DrawerMenu: React.FC<DrawerMenuProps> = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const sendEmail = () => {
    const email = 'unateamdev@gmail.com';
    const subject = 'Question from the app';
    const body = 'Hello, developer!';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink);
  };

  useEffect(() => {
    const loadSwitchState = async () => {
      try {
        const storedState = await AsyncStorage.getItem('languageSwitch');
        if (storedState !== null) {
          const newState = JSON.parse(storedState);
          setIsEnabled(newState);
          const newLang = newState ? 'en' : 'ru';
          // i18n.changeLanguage(newLang);
        } else {
          setIsEnabled(true); // Default to English
          // i18n.changeLanguage('en');
        }
      } catch (error) {
        console.error('Failed to load switch state', error);
      }
    };

    loadSwitchState();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    const newLang = newState ? 'en' : 'ru';
    // i18n.changeLanguage(newLang);
    try {
      await AsyncStorage.setItem('languageSwitch', JSON.stringify(newState));
    } catch (error) {
      console.error('Failed to save switch state', error);
    }
  };

  const handleButtonPress = () => {
    const url = 'https://www.freeprivacypolicy.com/live/3e079c31-e8bd-42cd-8c12-1c8a11f449af';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <>
      <View style={styles.header}></View>
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
            iconComponent={<ShareIcon name="sharealt" size={30} color="#cec5c0" style={styles.icon}/>}
            text="Share"
            onPress={() => console.log('Share button pressed')}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={<Mail name="mail" size={30} color="#cec5c0" style={styles.icon}/>}
            text="Email"
            onPress={sendEmail}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={<Star name="comment" size={30} color="#cec5c0" style={styles.icon}/>}
            text="Review"
            onPress={() => console.log('Review button pressed')}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={<Document name="document-attach-outline" size={30} color="#cec5c0" style={styles.icon}/>}
            text="Privacy Policy"
            onPress={handleButtonPress}
          />
        </View>

        <View style={styles.button}>
          <IconButton
            iconComponent={<Description name="script-text-outline" size={30} color="#cec5c0" style={styles.icon}/>}
            text="Terms"
            onPress={openModal}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    textShadowOffset: { width: 0, height: 0 },
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
    textShadowOffset: { width: 0, height: 0 },
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
