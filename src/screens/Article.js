import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import { Text, ImageView, Tags } from '../components';
import { useNavigation } from '../hooks';
import Colors from '../theme/colors';
import Utils from '../commons/utils';
import Image from 'react-native-scalable-image';
import Screens from './screens';
import { API_URL } from '../commons/constants';
import Storage from '../storage';

const Article = ({ componentId, article: articleProp = {} }) => {
  const navigation = useNavigation(componentId);

  const [article, setArticle] = useState(articleProp);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);

  const [commentText, setCommentText] = useState('');

  const goBack = () => {
    navigation.pop();
  };

  const getArticle = () => {
    fetch(API_URL + '/articles/' + articleProp._id)
      .then(response => response.json())
      .then(data => {
        setArticle(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getArticle();

    fetch(API_URL + '/users/' + articleProp.userId)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.log(error);
      });

    fetch(API_URL + '/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const renderComment = useCallback(
    comment => {
      const userIndex = users.findIndex(u => u._id === comment.userId);

      if (userIndex > -1) {
        const commentDate = moment(comment.time);

        return (
          <View style={styles.comment} key={comment.time}>
            <ImageView
              source={{ uri: users[userIndex].avatar }}
              style={styles.commentAvatar}
            />
            <View>
              <View style={styles.row}>
                <Text category="s2">{users[userIndex].name} </Text>
                <Text category="p3" color={Colors.gray}>
                  {' '}
                  {commentDate.format('DD/MM/YY HH:ss')}
                </Text>
              </View>
              <Text>{comment.text}</Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    },
    [users],
  );

  const navigateUserDetail = () => {
    navigation.push(
      Screens.UserDetail,
      { user: { _id: article.userId } },
      {},
      true,
    );
  };

  const onComment = () => {
    if (!commentText) {
      return;
    }

    fetch(API_URL + '/articles/' + articleProp._id + '/comments', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: commentText,
        time: Date.now(),
        userId: Storage.user.get()._id,
      }),
    })
      .then(response => response.json())
      .then(result => {
        getArticle();

        setCommentText('');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau');
      });
  };

  const renderLikeButton = () => {
    let iconName = 'ios-heart-outline';
    let iconColor = Colors.gray;

    if (
      article &&
      article.like &&
      article.like.some(id => id === Storage.user.get()._id)
    ) {
      iconName = 'ios-heart';
      iconColor = Colors.red;
    }

    return <Ionicons name={iconName} size={24} color={iconColor} />;
  };

  const onLike = () => {
    if (
      article &&
      article.like &&
      article.like.some(id => id === Storage.user.get()._id)
    ) {
      // Đã like, giờ bỏ like
      fetch(API_URL + '/articles/' + articleProp._id + '/like', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Storage.user.get()._id,
        }),
      })
        .then(response => response.json())
        .then(result => {
          getArticle();
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau');
        });
    } else {
      // Like
      fetch(API_URL + '/articles/' + articleProp._id + '/like', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: Storage.user.get()._id,
        }),
      })
        .then(response => response.json())
        .then(result => {
          getArticle();
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Lỗi', 'Đã xảy ra lỗi. Vui lòng thử lại sau');
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={20} color={Colors.white} />
        </TouchableOpacity>
        <Text category="s1" color={Colors.white} style={styles.title}>
          Thông tin bài viết
        </Text>
      </View>
      <View style={styles.content}>
        {article && user && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always">
            <TouchableOpacity
              style={styles.userInfo}
              onPress={navigateUserDetail}>
              <ImageView source={{ uri: user.avatar }} style={styles.avatar} />
              <View>
                <Text category="s1">{user.name}</Text>
                <Text category="p3" color={Colors.gray}>
                  {new Date(article.time).toUTCString()}
                </Text>
              </View>
            </TouchableOpacity>
            <Text category="p2" style={styles.articleName}>
              {article.name}
            </Text>

            <Image
              source={{ uri: article.image || article.uri }}
              style={styles.image}
              width={Utils.deviceWidth}
            />

            <View style={styles.tagContainer}>
              {article && `${article.tags}`.length > 0 && (
                <Tags data={`${article.tags}`.split(',')} selectAll />
              )}
            </View>

            <View style={styles.reaction}>
              <View style={styles.row}>
                <TouchableOpacity style={styles.icon} onPress={onLike}>
                  {renderLikeButton()}
                </TouchableOpacity>
                <Text category="s3">
                  {(article.like && article.like.length) || 0}
                </Text>
              </View>

              <View style={styles.row}>
                <TouchableOpacity style={styles.icon}>
                  <Ionicons
                    name="chatbox-outline"
                    size={20}
                    color={Colors.black}
                  />
                </TouchableOpacity>
                <Text category="s3">
                  {(article.comments && article.comments.length) || 0}
                </Text>
              </View>
            </View>

            <View style={styles.commentContainer}>
              <Text category="h6">Bình luận</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Nhập bình luận..."
                  style={styles.input}
                  value={commentText}
                  onChangeText={setCommentText}
                />
                <TouchableOpacity style={styles.send} onPress={onComment}>
                  <Text category="s2" color={Colors.white}>
                    Gửi
                  </Text>
                </TouchableOpacity>
              </View>

              {article.comments &&
                article.comments
                  .reverse()
                  .map(comment => renderComment(comment))}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Article;

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
  },
  image: {
    marginTop: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
  },
  articleName: {
    marginHorizontal: 12,
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  icon: {
    marginRight: 8,
  },
  commentContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
  send: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 12,
    marginLeft: 4,
  },
  comment: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
    marginLeft: 12,
  },
});
