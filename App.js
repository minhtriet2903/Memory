import {
  setSplashScreen,
  setHomeScreen,
  setLoginScreen,
} from './src/navigation';

import { setDefaultOptions } from './src/commons/options';
import Storage from './src/storage';
import Screens from './src/screens/screens';

const App = async () => {
  await setDefaultOptions();
  await Storage.load();

  setSplashScreen();
};

export default App;
