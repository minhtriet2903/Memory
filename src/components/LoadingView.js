import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

import Colors from '../theme/colors';
import Utils from '../commons/utils';

const Loading = ({ color = Colors.primary, loading = false, ...props }) => {
  return (
    <View style={styles.centerOverlap}>
      {loading && <Text style={styles.overlay} />}
      {loading && (
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          color={color}
        />
      )}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  centerOverlap: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: Utils.deviceHeight,
    width: Utils.deviceWidth,
  },
  indicator: {
    width: 72,
    height: 72,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.lightOverlay,
    height: Utils.deviceHeight,
  },
});
