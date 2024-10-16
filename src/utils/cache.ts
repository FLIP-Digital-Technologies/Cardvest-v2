import AsyncStorage from '@react-native-async-storage/async-storage';

const put = async (key: string, value: string) => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(key, value?.toString());
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    console.warn('CacheService: Failed to put pair ' + `[${key}, ${value}]`);
    __DEV__ && console.log(e);
  }
};

const get = async (key: string) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (
      (res?.includes("'{") && res?.includes("}'") && res?.includes(':')) ||
      (res?.includes("'[") && res?.includes("]'"))
    ) {
      return JSON.parse(res);
    } else {
      return res;
    }
  } catch (e) {
    console.warn('CacheService: Failed to get ' + key);
    __DEV__ && console.log(e);
  }
};

const del = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn('CacheService: Failed to remove ' + key);
    __DEV__ && console.log(e);
  }
};

const clear = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    console.warn('CacheService: Failed to clear ');
    __DEV__ && console.log(e);
  }
};

export const cacheService = {
  put,
  get,
  del,
  clear,
};
