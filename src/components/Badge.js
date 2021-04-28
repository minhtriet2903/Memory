import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';
import Colors from '../theme/colors';

const Badge = ({ value, selected = false, onPress = null }) => {
  const onTagPress = () => {
    if (onPress) {
      onPress(value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={onTagPress}>
      <Text category="p2">{value}</Text>
    </TouchableOpacity>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
  },
  selected: {
    backgroundColor: Colors.primary,
  },
});
