import UserStorage from './user';

class Storage {
  constructor() {
    this.user = new UserStorage();
  }

  load = async () => {
    await this.user.load();
  };
}

const storage = new Storage();
export default storage;
