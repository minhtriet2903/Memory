import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../theme/colors';
import Fonts from '../theme/fonts';

const CustomText = ({ category = 'p2', color = Colors.black, ...props }) => {
  return (
    <Text {...props} style={[styles[category], { color }, props.style]}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  h1: {
    fontSize: 36,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  h2: {
    fontSize: 32,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  h3: {
    fontSize: 28,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  h4: {
    fontSize: 24,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  h5: {
    fontSize: 20,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  h6: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    fontWeight: '800',
    color: Colors.black,
  },
  p1: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    color: Colors.black,
  },
  p2: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    color: Colors.black,
  },
  p3: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  p4: {
    fontSize: 11,
    fontFamily: Fonts.Regular,
    color: Colors.black,
  },
  s1: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    fontWeight: '800',
    color: Colors.black,
  },
  s2: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    fontWeight: '800',
    color: Colors.black,
  },
  s3: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    fontWeight: '800',
    color: Colors.black,
  },
});
