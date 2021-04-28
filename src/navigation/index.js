import { Navigation } from 'react-native-navigation';
import Screens from '../screens/screens';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../theme/colors';

export const setSplashScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Splash,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const setLoginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.Login,
              options: {
                statusBar: {
                  visible: true,
                  style: 'light',
                },
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  });
};

export const setHomeScreen = () => {
  Promise.all([
    Ionicons.getImageSource('ios-home-outline'),
    Ionicons.getImageSource('ios-people-outline'),
    Ionicons.getImageSource('notifications-outline'),
    Ionicons.getImageSource('ios-settings-outline'),
  ])
    .then(icons => {
      Navigation.setRoot({
        root: {
          bottomTabs: {
            id: Screens.Main,
            options: {
              layout: { orientation: ['portrait'] },
            },
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: Screens.Home,
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: icons[0],
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: Screens.Users,
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: icons[1],
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: Screens.Notification,
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: icons[2],
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: Screens.Setting,
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      icon: icons[3],
                    },
                  },
                },
              },
            ],
          },
        },
      });
    })
    .catch(error => console.log(error));
};
