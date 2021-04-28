import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MasonryList from 'react-native-masonry-list';

import { Text, SearchBox, Tags, ImageView } from '../components';
import Colors from '../theme/colors';
import { useNavigation } from '../hooks';
import Screens from './screens';
import { API_URL } from '../commons/constants';

const TAGS = ['All', 'Phong cảnh', 'Du lịch', 'Học tập', 'Ẩm thực'];

const Home = ({ componentId }) => {
  const navigation = useNavigation(componentId);

  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);

  const searchTimer = useRef(0);
  const [refreshing, setRefreshing] = useState(false);

  const getUsers = userIds => {
    fetch(API_URL + '/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getArticles = (search = '', tag = '') => {
    fetch(API_URL + '/articles')
      .then(response => response.json())
      .then(data => {
        // Dùng mẹo để search local
        let newData = data.filter(article => article.name.includes(search));

        if (tag && tag !== 'All') {
          newData = newData.filter(article => article.tags.includes(tag));
        }

        setArticles(
          newData.map(item => {
            item.uri = item.image;
            return item;
          }),
        );
        setRefreshing(false);

        const userIds = [];
        data.forEach(item => {
          if (!userIds.some(u => u === item.userId)) {
            userIds.push(item.userId);
          }
        });

        getUsers(userIds);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Lỗi', 'Tải bài viết thất bại');
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  const navigateArticleDetail = article => {
    navigation.push(Screens.Article, { article }, {}, true);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getArticles();
  };

  const onAddArticle = () => {
    navigation.push(Screens.AddArticle, { onSuccess: onRefresh }, {}, true);
  };

  const renderArticleFooter = article => {
    const userIndex = users.findIndex(u => u._id === article.userId);

    let userInfoView = null;
    if (userIndex > -1) {
      userInfoView = (
        <View style={styles.userInfo}>
          <ImageView
            source={{ uri: users[userIndex].avatar }}
            style={styles.userAvatar}
          />
          <Text category="s3" color={Colors.white} numberOfLines={1}>
            {users[userIndex].name}
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={[
          styles.articleContainer,
          {
            width: article.masonryDimensions.width,
            margin: article.masonryDimensions.gutter / 2,
          },
        ]}
        onPress={() => navigateArticleDetail(article)}
        key={article._id}>
        {userInfoView}
        <Text numberOfLines={2} color={Colors.white} category="p3">
          {article.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderArticleImage = data => {
    return <ImageView source={{ uri: data.source.uri }} style={data.style} />;
  };

  const onChangeKeyword = text => {
    setKeyword(text);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
      searchTimer.current = 0;
    }

    searchTimer.current = setTimeout(() => {
      getArticles(text);
    }, 300);
  };

  const onChangeTag = value => {
    getArticles(keyword, value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBox value={keyword} onChangeText={onChangeKeyword} />
        <TouchableOpacity style={styles.addArticle} onPress={onAddArticle}>
          <Ionicons name="add" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tags}>
        <Tags data={TAGS} onTagChange={onChangeTag} />
      </View>

      <View style={styles.articles}>
        <MasonryList
          images={articles.reverse()}
          masonryFlatListColProps={{
            showsVerticalScrollIndicator: false,
            refreshControl: (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            ),
            keyExtractor: item => Date.now(),
          }}
          imageContainerStyle={styles.articleImage}
          spacing={4}
          renderIndividualFooter={renderArticleFooter}
          customImageComponent={renderArticleImage}
          onPressImage={navigateArticleDetail}
          rerender
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  addArticle: {
    padding: 7,
    backgroundColor: Colors.light,
    borderRadius: 4,
    marginLeft: 4,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  articles: {
    flex: 1,
    padding: 4,
  },
  articleContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.lightOverlay,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  articleImage: {
    borderRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatar: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
  },
});
