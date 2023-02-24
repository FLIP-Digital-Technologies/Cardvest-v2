import { extendTheme } from 'native-base';
import palette from './colors';
import typography from './fonts';

const customTheme = extendTheme({
  colors: {
    white: palette.WHITE,
    black: palette.BLACK,
    lightText: palette.WHITE,
    darkText: palette.BLACK,

    primary: palette.EMERALD,
    secondary: palette.ORANGE,
    tertiary: palette.MIDNIGHT_BLUE,

    pageBackground: palette.MIDNIGHT_BLUE,
    headerBackground: palette.WHITE,

    ...palette,
  },
  components: {
    Actionsheet: {
      defaultProps: {
        _backdrop: { opacity: 0.06 },
      },
    },
    Select: {
      defaultProps: {
        _item: {
          _pressed: {
            backgroundColor: '#FAFAF0',
          },
        },
      },
    },
    Pressable: {
      defaultProps: {
        // size: 12,
        borderRadius: '4px',
        width: 'auto',
      },
    },
    Button: {
      defaultProps: {
        // size: 12,
        borderRadius: '4px',
      },
    },
    Text: {
      defaultProps: {
        fontFamily: 'Satoshi',
      },
    },
  },

  ...typography,

  config: {
    // Changing initialColorMode to 'light'
    initialColorMode: 'light',
  },
});

export type Theme = typeof customTheme;
export default customTheme;
