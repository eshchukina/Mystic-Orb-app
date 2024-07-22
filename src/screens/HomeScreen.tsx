import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import DrawerMenu from '../sidemenu/DrawerMenu';
import IconButton from '../buttons/IconButton';
import Setting from 'react-native-vector-icons/SimpleLineIcons';
import Star from 'react-native-vector-icons/SimpleLineIcons';
import Button from '../buttons/Button';
import {useTranslation} from 'react-i18next';
const screenHeight = Dimensions.get('window').height;

interface AnimationProps {
  anim: Animated.Value;
  duration: number;
}

const HomeScreen: React.FC = ({navigation}) => {
  const {t} = useTranslation();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const drawerTranslateY = useRef<Animated.Value>(
    new Animated.Value(-screenHeight),
  ).current;
  const fadeAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.sequence([
        Animated.timing(drawerTranslateY, {
          toValue: -screenHeight,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsDrawerOpen(false);
      });
    } else {
      setIsDrawerOpen(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(drawerTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const closeDrawer = () => {
    toggleDrawer();
  };

  const [animations] = useState<AnimationProps[]>(() =>
    [...Array(50)].map(() => ({
      anim: new Animated.Value(0),
      duration: Math.random() * 10000 + 10000,
    })),
  );

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    animations.forEach(({anim, duration}) => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 1,
            duration: duration * 2,
            useNativeDriver: true,
            easing: t => Math.sin(t * Math.PI),
          }),
        ]),
      ).start();
    });
  };

  const handlePress = async () => {
    if (isDrawerOpen) {
      await closeDrawer();
    }
    navigation.navigate('Prediction', {isEnabled});
  };

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          styles.drawer,
          {transform: [{translateY: drawerTranslateY}]},
          {opacity: fadeAnim},
        ]}>
        <DrawerMenu isEnabled={isEnabled} setIsEnabled={setIsEnabled} />
      </Animated.View>
      <TouchableWithoutFeedback
        onPress={isDrawerOpen ? closeDrawer : undefined}>
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton
              iconComponent={
                <Setting
                  name="settings"
                  size={40}
                  color="#cec5c0"
                  style={styles.icon}
                />
              }
              text=""
              onPress={toggleDrawer}
            />
          </View>
          {animations.map(({anim}, index) => {
            const initialTranslateY = -Math.random() * screenHeight;
            const initialTranslateX = (Math.random() - 0.5) * 2 * 150;

            return (
              <Animated.View
                key={index}
                style={[
                  styles.star,
                  {
                    transform: [
                      {
                        translateY: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [initialTranslateY, screenHeight],
                        }),
                      },
                      {
                        translateX: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [initialTranslateX, initialTranslateX],
                        }),
                      },
                      {
                        rotate: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}>
                <Star
                  name="star"
                  size={20}
                  color="#526466"
                  style={styles.iconStar}
                />
              </Animated.View>
            );
          })}

          <View style={styles.container}>
            <Text style={styles.titleText}>{t('welcome')}</Text>

            <Button
              text={t('mainButton')}
              paddingRight={15}
              paddingLeft={15}
              padding={15}
              color="#7b4c52"
              onPress={handlePress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#493b48',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  drawer: {
    borderRadius: 20,
    backgroundColor: '#7b4c52',
    zIndex: 2000,
    position: 'absolute',
    height: 450,
    top: 0,

    width: '100%',
    shadowColor: '#cec5c0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    top: 20,
    left: '40%',
    zIndex: 10,
  },
  titleText: {
    fontFamily: 'antikvarika1',
    fontSize: 30,
    textAlign: 'center',
    color: '#cec5c0',
    textShadowColor: '#cec5c0',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  text: {
    fontFamily: 'second',
    fontSize: 20,
    textAlign: 'center',
    color: '#cec5c0',
    textShadowColor: '#cec5c0',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  star: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: '45%',
  },
  icon: {
    textShadowColor: '#cec5c0',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  iconStar: {
    textShadowColor: '#526466',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
});

export default HomeScreen;
