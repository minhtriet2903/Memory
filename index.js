import { LogBox } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';
import App from './App';

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.dismissAllModals();

  LogBox.ignoreLogs([
    'Remote debugger',
    'VirtualizedLists should never be nested',
    'Non-serializable values were found in the navigation state',
  ]);

  App();
});
