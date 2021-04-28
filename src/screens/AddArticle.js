import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Text, ImageView } from '../components';
import { useNavigation } from '../hooks';
import Colors from '../theme/colors';
import { API_URL } from '../commons/constants';
import Storage from '../storage';

const AddArticle = ({ componentId, onSuccess = null }) => {
  const navigation = useNavigation(componentId);

  const [name, setName] = useState('');
  const [tag, setTag] = useState('');
  const [imageUri, setImageUri] = useState('');

  const [showModal, setShowModal] = useState(false);

  const goBack = () => {
    navigation.pop();
  };

  const uploadImage = file => {
    if (!file) {
      return;
    }

    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };

    fetch(API_URL + '/upload', config)
      .then(response => response.json())
      .then(result => {
        console.log('Data: ', result);
        setImageUri(API_URL + '/uploads/images/' + result.filename);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Lỗi', 'Lỗi upload file. Vui lòng thử lại');
      });
  };

  const chooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      setShowModal(false);
      uploadImage(response);
    });
  };

  const takePicture = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      setShowModal(false);
      uploadImage(response);
    });
  };

  const onCreateArticle = () => {
    if (!name || !imageUri) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const data = {
      name,
      image: imageUri,
      tags: tag,
      userId: Storage.user.get()._id,
    };

    fetch(API_URL + '/articles', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (onSuccess) {
          onSuccess();
        }
        goBack();
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Lỗi', 'Thêm bài viết lỗi. Vui lòng thử lại');
      });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Ionicons name="ios-chevron-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <Text category="s1" color={Colors.white} style={styles.title}>
            Đăng bài viết
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text category="s2">Tiêu đề</Text>
            <TextInput
              placeholder="Nhập cảm nghĩ của bạn về hình ảnh này..."
              style={styles.input}
              value={name}
              onChangeText={setName}
              multiline
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text category="s2">Tags</Text>
            <TextInput
              placeholder="Phong cảnh,Học tập,Ẩm thực,..."
              style={styles.input}
              value={tag}
              onChangeText={setTag}
              multiline
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text category="s2">Chọn hình ảnh </Text>
            <TouchableOpacity
              style={[styles.input, styles.upload]}
              onPress={() => setShowModal(true)}>
              <Text>Chọn</Text>
            </TouchableOpacity>

            {!!imageUri && (
              <ImageView source={{ uri: imageUri }} style={styles.image} />
            )}
          </View>

          <TouchableOpacity style={styles.add} onPress={onCreateArticle}>
            <Text category="s2" color={Colors.white}>
              Đăng bài
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal transparent animationType="fade" visible={showModal}>
        <View style={styles.modal}>
          <Text onPress={() => setShowModal(false)} style={styles.overlay} />
          <View style={styles.view}>
            <TouchableOpacity style={styles.row} onPress={chooseImage}>
              <Ionicons
                name="phone-portrait-outline"
                size={20}
                style={styles.icon}
                color={Colors.black}
              />
              <Text category="s2">Chọn từ bộ nhớ thiết bị</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, styles.takeCapture]}
              onPress={takePicture}>
              <Ionicons
                name="camera-outline"
                size={20}
                style={styles.icon}
                color={Colors.black}
              />
              <Text category="s2">Chụp ảnh mới</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddArticle;

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
  inputContainer: {
    marginTop: 24,
  },
  input: {
    backgroundColor: Colors.lightGrey,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 12,
  },
  upload: {
    width: 72,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  takeCapture: {
    marginTop: 24,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.lightOverlay,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginTop: 12,
  },
  add: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
