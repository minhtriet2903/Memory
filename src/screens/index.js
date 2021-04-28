import React from 'react';
import { Navigation } from 'react-native-navigation';
import Screens from './screens';

import Splash from './Splash';
import Login from './Login';
import Register from './Register';

import Home from './Home';
import Users from './Users';
import Notification from './Notification';
import Setting from './Setting';

import Article from './Article';
import AddArticle from './AddArticle';

import UserDetail from './UserDetail';

const registerScreen = (name, Layout) => {
  Navigation.registerComponent(name, () => Layout);
};

export const registerScreens = () => {
  registerScreen(Screens.Splash, Splash);
  registerScreen(Screens.Login, Login);
  registerScreen(Screens.Register, Register);

  registerScreen(Screens.Home, Home);
  registerScreen(Screens.Users, Users);
  registerScreen(Screens.Notification, Notification);
  registerScreen(Screens.Setting, Setting);

  registerScreen(Screens.Article, Article);
  registerScreen(Screens.AddArticle, AddArticle);

  registerScreen(Screens.UserDetail, UserDetail);
};
