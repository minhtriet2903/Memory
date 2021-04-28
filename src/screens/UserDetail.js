import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MasonryList from 'react-native-masonry-list';

import { Text, ImageView } from '../components';
import { useNavigation } from '../hooks';
import Colors from '../theme/colors';
import Screens from './screens';
import { API_URL } from '../commons/constants';

const UserDetail = ({ componentId, user: userProp }) => {
  const navigation = useNavigation(componentId);

  const [user, setUser] = useState();
  const [articles, setArticles] = useState([]);

  const goBack = () => {
    navigation.pop();
  };

  useEffect(() => {
    fetch(API_URL + '/users/' + userProp._id)
      .then(response => response.json())
      .then(data => {
        setUser(data);

        fetch(API_URL + '/users/' + userProp._id + '/articles')
          .then(response => response.json())
          .then(result => {
            setArticles(
              result.map(item => {
                item.uri = item.image;
                return item;
              }),
            );
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const navigateArticleDetail = article => {
    navigation.push(Screens.Article, { article }, {}, true);
  };

  const renderArticleImage = data => {
    return <ImageView source={{ uri: data.source.uri }} style={data.style} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text category="s1" color={Colors.white} style={styles.title}>
          Thông tin người dùng
        </Text>
      </View>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {user && (
            <View style={styles.userInfo}>
              <ImageView source={{ uri: user.avatar }} style={styles.avatar} />
              <Text category="s1">{user.name}</Text>

              <Text category="p2">{user.slogan}</Text>
            </View>
          )}
          {articles.length > 0 && (
            <React.Fragment>
              <View style={styles.line} />
              <Text category="s1" style={styles.articleWrapper}>
                Hình ảnh đã chia sẻ
              </Text>
              <MasonryList
                images={articles}
                masonryFlatListColProps={{
                  showsVerticalScrollIndicator: false,
                  nestedScrollEnabled: true,
                }}
                imageContainerStyle={styles.articleImage}
                spacing={4}
                onPressImage={navigateArticleDetail}
                customImageComponent={renderArticleImage}
              />
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userInfo: {
    marginTop: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 4,
    marginBottom: 16,
  },
  articleWrapper: {
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  articleImage: {
    borderRadius: 4,
  },
  line: {
    backgroundColor: Colors.lightGrey,
    height: 1,
    width: '100%',
    marginTop: 24,
  },
});
