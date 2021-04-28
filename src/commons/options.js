import {
  Navigation,
  OptionsModalPresentationStyle,
} from 'react-native-navigation';
import { Dimensions } from 'react-native';

import Colors from '../theme/colors';

const flags = {
  showTextInputToTestKeyboardInteraction: false,
  useCustomAnimations: false,
  useSlowOpenScreenAnimations: false,
  useSlideAnimation: true,
};

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

const SHOW_DURATION = 250 * (flags.useSlowOpenScreenAnimations ? 2.5 : 1);
const DEFAULT_DURATION = 100;

const setDefaultOptions = async () => {
  await Navigation.setDefaultOptions({
    layout: {
      componentBackgroundColor: Colors.white,
      orientation: ['portrait'],
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      iconColor: Colors.gray,
      selectedIconColor: Colors.primary,
      selectedTextColor: Colors.primary,
    },
    animations: {
      ...(flags.useSlideAnimation
        ? slideAnimations
        : flags.useCustomAnimations
        ? customAnimations
        : {}),
    },
    modalPresentationStyle: OptionsModalPresentationStyle.fullScreen,
    topBar: {
      visible: false,
      drawBehind: true,
    },
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: Colors.primaryDark,
    },
    sideMenu: {
      left: {
        enabled: false,
        shouldStretchDrawer: true, // defaults to true, when false sideMenu contents not stretched when opened past the width
      },
      right: {
        shouldStretchDrawer: true, // defaults to true, when false sideMenu contents not stretched when opened past the width
      },
      animationType: 'slide-and-scale', // defaults to none if not provided, options are 'parallax', 'door', 'slide', or 'slide-and-scale'
      openGestureMode: 'bezel', // 'entireScreen' | 'bezel'
    },
  });
};

const slideAnimations = {
  push: {
    waitForRender: true,
    content: {
      translationX: {
        from: width,
        to: 0,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
      alpha: {
        from: 0.7,
        to: 1,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
    },
  },
  pop: {
    content: {
      translationX: {
        from: 0,
        to: width,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
      alpha: {
        from: 1,
        to: 0.3,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
    },
  },
  showOverlay: {
    waitForRender: true,
    content: {
      translationX: {
        from: width,
        to: 0,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
      alpha: {
        from: 0.7,
        to: 1,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
    },
  },
  dismissOverlay: {
    content: {
      translationX: {
        from: 0,
        to: width,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
      alpha: {
        from: 1,
        to: 0.3,
        duration: flags.useSlowOpenScreenAnimations
          ? SHOW_DURATION
          : DEFAULT_DURATION,
      },
    },
  },
  setRoot: {
    waitForRender: true,
  },
};

const customAnimations = {
  showModal: {
    waitForRender: true,
    translationY: {
      from: height,
      to: 0,
      duration: SHOW_DURATION,
      interpolation: 'decelerate',
    },
    alpha: {
      from: 0.65,
      to: 1,
      duration: SHOW_DURATION * 0.7,
      interpolation: 'accelerate',
    },
  },
  dismissModal: {
    translationY: {
      from: 0,
      to: height,
      duration: SHOW_DURATION * 0.9,
    },
  },
  push: {
    waitForRender: true,
    content: {
      alpha: {
        from: 0.65,
        to: 1,
        duration: SHOW_DURATION * 0.7,
        interpolation: 'accelerate',
      },
      translationY: {
        from: height * 0.3,
        to: 0,
        duration: SHOW_DURATION,
        interpolation: 'decelerate',
      },
    },
  },
  pop: {
    content: {
      alpha: {
        from: 1,
        to: 0,
        duration: SHOW_DURATION,
      },
      translationY: {
        from: 0,
        to: height * 0.7,
        duration: SHOW_DURATION * 0.9,
      },
    },
  },
};

export { setDefaultOptions };
