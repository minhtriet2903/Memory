import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Text } from '../components';
import Colors from '../theme/colors';

const DATA = [
  {
    _id: '1',
    title: 'Triet Nguyen đã thích hình ảnh của bạn',
    time: Date.now(),
  },
  {
    _id: '2',
    title: 'Minh Nguyen đã bình luận về ảnh của bạn',
    time: Date.now(),
  },
  {
    _id: '3',
    title: 'Minh Triet đã bình luận về ảnh của bạn',
    time: Date.now(),
  },
  {
    _id: '4',
    title: 'Triet NPM đã thích hình ảnh của bạn',
    time: Date.now(),
  },
];

const Notification = () => {
  const renderNotificationItem = item => {
    return (
      <View style={styles.itemContainer} key={item._id}>
        <Text category="s2">{item.title}</Text>
        <Text category="p3" color={Colors.gray} style={styles.time}>
          {new Date(item.time).toUTCString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text category="h5">Thông báo</Text>

      <View style={styles.wrapper}>
        {DATA.map(item => renderNotificationItem(item))}
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  wrapper: {
    marginTop: 12,
  },
  itemContainer: {
    marginVertical: 12,
    borderRadius: 4,
    backgroundColor: Colors.light,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  time: {
    marginTop: 4,
  },
});
