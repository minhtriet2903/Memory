import { Platform } from 'react-native';

const Fonts = Platform.select({
  android: {
    Light: 'Roboto-Light',
    LightItalic: 'Roboto-LightItalic',
    Bold: 'Roboto-Bold',
    BoldItalic: 'Roboto-BoldItalic',
    ExtraLight: 'Roboto-Thin',
    ExtraLightItalic: 'Roboto-ThinItalic',
    Italic: 'Roboto-Italic',
    Regular: 'Roboto-Regular',
    Black: 'Roboto-Black',
    BlackItalic: 'Roboto-BlackItalic',
    Medium: 'Roboto-Medium',
    MediumItalic: 'Roboto-MediumItalic',
  },
  ios: {
    Light: 'Roboto-Light',
    LightItalic: 'Roboto-LightItalic',
    Bold: 'Roboto-Bold',
    BoldItalic: 'Roboto-BoldItalic',
    ExtraLight: 'Roboto-Hairline',
    ExtraLightItalic: 'Roboto-HairlineItalic',
    Italic: 'Roboto-Italic',
    Regular: 'Roboto-Regular',
    Black: 'Roboto-Black',
    BlackItalic: 'Roboto-BlackItalic',
    Medium: 'Roboto-Medium',
    MediumItalic: 'Roboto-MediumItalic',
  },
});

export default Fonts;
