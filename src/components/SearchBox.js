import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../theme/colors';

const SearchBox = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color={Colors.black} />
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderRadius: 4,
    padding: 0,
    margin: 0,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.black,
    flex: 1,
  },
});
