import AsyncStorage from '@react-native-async-storage/async-storage';
import noop from 'lodash/noop';
import { getLocales } from 'react-native-localize'; // Use getLocales instead of findBestAvailableLanguage
import { defaultLanguage, languagesResources } from './languageConfig';

const LOCALE_PERSISTENCE_KEY = 'app_locale';

const RNLanguageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (cb: (detectedLocale: string) => void): Promise<void> => {
    try {
      // Retrieve cached locale
      const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);

      // If not found, detect from device
      if (!persistedLocale) {
        // Get the device's current locale
        const locales = getLocales();
        const languageTags = Object.keys(languagesResources);
        const detectedLocale = locales.find(locale => languageTags.includes(locale.languageTag));

        // Return detected locale or default language
        return cb(detectedLocale?.languageTag ?? defaultLanguage);
      }

      cb(persistedLocale);
    } catch {
      console.warn('Failed to detect locale!');
      console.warn('Will use defaultLanguage:', defaultLanguage);

      cb(defaultLanguage);
    }
  },
  init: noop,
  cacheUserLanguage: (locale: string): void => {
    AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
};

export default RNLanguageDetector;
