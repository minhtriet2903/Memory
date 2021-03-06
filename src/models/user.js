export default class User {
  constructor() {
    this._id = '';
    this.email = '';
    this.password = '';
    this.name = '';
    this.slogan = '';
    this.accesstoken = '';
    this.avatar = '';
  }

  update(data) {
    this._id = data._id || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.name = data.name || '';
    this.slogan = data.slogan || '';
    this.accesstoken = data.accesstoken || '';
    this.avatar = data.avatar || '';
  }

  static clone(data) {
    const user = new User();
    user.update(data);
    return user;
  }
}
