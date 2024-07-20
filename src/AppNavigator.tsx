import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import PredictionScreen from './screens/PredictionScreen';
import ProfileScreen from './screens/ProfileScreen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,

} from 'react-native';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            if (route.name === 'Prediction') {
              return (
                <MaterialCommunityIcons
                  name="crystal-ball"
                  size={50}
                  color={color}
                  style={styles.icon}

                />
              );
            } else if (route.name === 'Home') {
              return (
                <SimpleLineIcons name="magic-wand" size={40} color={color}    style={styles.icon}
/>
              );
            } else if (route.name === 'Profile') {
              return (
                <MaterialCommunityIcons
                  name="wizard-hat"
                  size={45}
                  color={color}
                  style={styles.icon}

                />
              );
            }
          },

          tabBarActiveTintColor: '#526466',
          tabBarInactiveTintColor: '#cec5c0',
          tabBarStyle: {
            height: 60,
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#778284',
            borderTopWidth: 0,
            borderRadius: 20,
            shadowColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginBottom: 30,
          },

          tabBarIconStyle: {
            textShadowColor: '#cec5c0',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 5,
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Prediction" component={PredictionScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
 
  icon: {
    textShadowColor: '#526466',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});
export default AppNavigator;
