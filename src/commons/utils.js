import { Dimensions } from 'react-native';

class Utils {
  constructor() {
    this.deviceWidth = Dimensions.get('window').width;
    this.deviceHeight = Dimensions.get('window').height;
  }

  removeEmptyAttributes = data => {
    const obj = { ...data };
    Object.keys(obj).forEach(key => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      }
    });
    return obj;
  };

  convertTimeToTimestamp = time => {
    return Date.parse(time);
  };
}

export default new Utils();
