import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { useNavigation } from '../hooks';
import { setHomeScreen } from '../navigation';
import Screens from './screens';
import { Text } from '../components';
import Colors from '../theme/colors';
import utils from '../commons/utils';
import { API_URL } from '../commons/constants';
import Storage from '../storage';

const Login = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {
      // setHomeScreen();
    }, 300);
  }, []);

  const navigateRegister = () => {
    navigation.push(Screens.Register);
  };

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    fetch(API_URL + '/users/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(async data => {
        const user = { ...data.user, ...data.token };
        user.password = password;

        await Storage.user.save(user);

        setHomeScreen();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Lỗi', 'Đăng nhập thất bại');
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text category="h2">Đăng nhập</Text>
        <View style={styles.inputContainer}>
          <Text category="s2">Email</Text>
          <TextInput
            placeholder="Nhập email..."
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text category="s2">Mật khẩu</Text>
          <TextInput
            placeholder="Nhập mật khẩu..."
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text category="s2" color={Colors.white}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.register} onPress={navigateRegister}>
          <Text category="s3">Chưa có tài khoản ? Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingTop: 96,
  },
  inputContainer: {
    marginTop: 24,
  },
  input: {
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    width: utils.deviceWidth - 120,
    marginTop: 6,
  },
  button: {
    width: utils.deviceWidth - 120,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  register: {
    marginTop: 24,
    padding: 8,
  },
});
