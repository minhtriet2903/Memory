import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '../hooks';
import { setHomeScreen } from '../navigation';
import Screens from './screens';
import { Text } from '../components';
import Colors from '../theme/colors';
import utils from '../commons/utils';
import { API_URL } from '../commons/constants';

const Register = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');

  const goBack = () => {
    navigation.pop();
  };

  const onRegister = () => {
    if (!email || !password || !confirm || !name) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirm) {
      Alert.alert('Thông báo', 'Mật khẩu nhập lại không trùng khớp');
      return;
    }

    const data = {
      name,
      password,
      email,
      slogan,
    };

    fetch(API_URL + '/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('Thông báo', 'Đăng ký thành công', [
          {
            text: 'Ok',
            onPress: goBack,
          },
        ]);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Thông báo', 'Đăng ký thất bại');
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>

        <Text category="h2">Đăng ký</Text>
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
        <View style={styles.inputContainer}>
          <Text category="s2">Nhập lại mật khẩu</Text>
          <TextInput
            placeholder="Nhập lại mật khẩu..."
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text category="s2">Họ tên</Text>
          <TextInput
            placeholder="Nhập họ tên..."
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text category="s2">Slogan (Nếu có)</Text>
          <TextInput
            placeholder="Nhập slogan..."
            style={styles.input}
            value={slogan}
            onChangeText={setSlogan}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text category="s2" color={Colors.white}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 48,
    paddingTop: 48,
  },
  back: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 12,
    borderRadius: 4,
    backgroundColor: Colors.light,
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
});
