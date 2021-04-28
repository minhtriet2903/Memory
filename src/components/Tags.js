import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import Text from './Text';
import Colors from '../theme/colors';
import Badge from './Badge';

const Tags = ({
  data,
  onTagChange,
  initialValue = 'All',
  selectAll = false,
}) => {
  const [selectedTag, setSelectedTag] = useState(initialValue);

  const onTagPress = value => {
    setSelectedTag(value);

    if (onTagChange) {
      onTagChange(value);
    }
  };

  return (
    <ScrollView horizontal>
      {data.map(badge => (
        <Badge
          key={badge}
          value={badge}
          onPress={onTagPress}
          selected={selectedTag === badge || selectAll}
        />
      ))}
    </ScrollView>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
