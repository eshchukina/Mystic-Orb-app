import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
const App = () => {
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#493b48',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
