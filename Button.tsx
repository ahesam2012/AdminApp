import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps {
  text: string;
  onPress: () => void;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ text, onPress, color = '#007bff', style }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Button;
