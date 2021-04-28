import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { API_URL } from '../commons/constants';

import { SearchBox, ImageView, Text } from '../components';
import { useNavigation } from '../hooks';
import Screens from './screens';

const Users = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState();
  const searchTimer = useRef(0);

  const getUsers = (search = '') => {
    fetch(API_URL + '/users')
      .then(response => response.json())
      .then(data => {
        const newData = data.filter(user => user.name.includes(search));
        setUsers(newData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const navigateUserDetail = user => {
    navigation.push(Screens.UserDetail, { user }, {}, true);
  };

  const keyExtractor = useCallback(item => item._id, []);

  const renderUser = useCallback(({ item }) => {
    return (
      <TouchableOpacity
        style={styles.user}
        onPress={() => navigateUserDetail(item)}>
        <ImageView source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text category="s1">{item.name}</Text>
          <Text category="p2" numberOfLines={1}>
            {item.slogan}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const onChangeKeyword = text => {
    setKeyword(text);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
      searchTimer.current = 0;
    }

    searchTimer.current = setTimeout(() => {
      getUsers(text);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBox value={keyword} onChangeText={onChangeKeyword} />
      </View>
      <View style={styles.content}>
        <FlatList
          data={users}
          extraData={users}
          renderItem={renderUser}
          keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
});
