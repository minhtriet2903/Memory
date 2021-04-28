import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Text, ImageView } from '../components';
import Colors from '../theme/colors';
import { useNavigation } from '../hooks';
import Screens from './screens';
import Storage from '../storage';
import { setLoginScreen } from '../navigation';

const Setting = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  const user = Storage.user.get();

  const renderSettingItem = useCallback((icon, name, onPress) => {
    return (
      <View style={styles.settingContainer}>
        <Ionicons name={icon} size={20} color={Colors.black} />
        <Text category="s2" style={styles.settingName}>
          {name}
        </Text>
      </View>
    );
  }, []);

  const viewInfo = () => {
    navigation.push(Screens.UserDetail, { user: Storage.user.get() }, {}, true);
  };

  const onLogout = () => {
    Alert.alert('Thông báo', 'Bạn có chắc muốn đăng xuất ?', [
      {
        text: 'OK',
        onPress: async () => {
          await Storage.user.remove();
          setLoginScreen();
        },
      },
      {
        text: 'Hủy',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text category="h5">Cài đặt</Text>
      <TouchableOpacity style={styles.userInfo} onPress={viewInfo}>
        <ImageView source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text category="h6">{user.name}</Text>
          <Text category="p2" numberOfLines={1}>
            {user.slogan}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.line} />
      {renderSettingItem('notifications-outline', 'Cài đặt thông báo')}
      {renderSettingItem('ios-person-outline', 'Cài đặt tài khoản')}
      {renderSettingItem('ios-earth', 'Chuyển đổi ngôn ngữ')}
      <View style={styles.line} />
      {renderSettingItem(
        'ios-information-circle-outline',
        'Thông tin ứng dụng',
      )}
      {renderSettingItem('key-outline', 'Đổi mật khẩu')}
      <View style={styles.line} />
      <TouchableOpacity style={styles.logout} onPress={onLogout}>
        <Text color={Colors.white}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  line: {
    backgroundColor: Colors.light,
    width: '100%',
    height: 1,
    marginTop: 16,
    marginBottom: 12,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingName: {
    paddingHorizontal: 12,
  },
  logout: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
