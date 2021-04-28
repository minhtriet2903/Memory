import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (model, key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      model.update(JSON.parse(data));
      return model;
    }
  } catch (error) {
    console.log(`[Storage] Retrieve ${key} error:`, error);
  }
  return null;
};

export const setItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`[Storage] Save ${key} error`, error);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`[Storage] Remove ${key} error`, error);
  }
};
