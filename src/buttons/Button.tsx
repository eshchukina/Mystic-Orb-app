import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface ButtonProps {
  text: string;
  padding?: number;
  color?: string;
  paddingLeft?: number;
  paddingRight?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  padding,
  color = '#000',
  onPress,
  paddingLeft,
  paddingRight,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          padding: padding,
          backgroundColor: color,
          paddingLeft: paddingLeft,
          paddingRight: paddingRight,
        },
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
  },
  text: {
    color: '#cec5c0',
    textAlign: 'center',
    fontFamily: 'antikvarika1',
    zIndex: 2000,
    fontSize: 25,
    textShadowColor: '#cec5c0',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default Button;
