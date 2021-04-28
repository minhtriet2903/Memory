import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { useNavigation } from '../hooks';
import { setLoginScreen, setHomeScreen } from '../navigation';
import Screens from './screens';
import { ImageView } from '../components';
import Colors from '../theme/colors';
import Storage from '../storage';
import { API_URL } from '../commons/constants';

const Splash = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  useEffect(() => {
    console.log('h');
    const { email, password } = Storage.user.get();

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
        setLoginScreen();
      });
  }, []);

  return (
    <View style={styles.container}>
      <ImageView
        source={require('../assets/images/memory.png')}
        style={styles.logo}
        resizeMode={ImageView.resizeMode.contain}
      />

      <ActivityIndicator size={24} color={Colors.primaryDark} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 200,
  },
});
