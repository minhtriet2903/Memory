import User from '../models/user';
import { STORAGE } from '../commons/constants';
import Utils from '../commons/utils';

import { getItem, removeItem, setItem } from './wrapper';

class UserStorage {
  constructor() {
    this.key = STORAGE.USER_DATA;
    this.data = new User();
  }

  save = async data => {
    this.data = User.clone({
      ...this.data,
      ...Utils.removeEmptyAttributes(data),
    });
    await setItem(this.key, this.data);
  };

  load = async () => {
    return getItem(this.data, this.key);
  };

  remove = async () => {
    this.data = new User();
    await removeItem(this.key);
  };

  get = () => {
    return this.data;
  };

  isLoggedIn = () => {
    return this.data && this.data.accessToken;
  };
}

export default UserStorage;
