/* eslint-disable no-useless-escape */
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { Alert } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';

export const rnd = (() => {
  const gen = (min: number, max: number) => max++ && [...Array(max - min)].map((s, i) => String.fromCharCode(min + i));

  const sets = {
    num: gen(48, 57),
    alphaLower: gen(97, 122),
    alphaUpper: gen(65, 90),
    special: [...`~!@#$%^&*()_+-=[]\{}|;:'",./<>?`],
  };

  function* iter(len: number, set: string | any[]) {
    if (set.length < 1) set = Object.values(sets).flat();
    for (let i = 0; i < len; i++) yield set[(Math.random() * set.length) | 0];
  }

  return Object.assign((len: any, ...set: any[]) => [...iter(len, set.flat())].join(''), sets);
})();

export const formatBytes = (bytes: number | undefined, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export interface ImageUploadInfo extends ImageInfo {
  fileSize?: number;
  uploaded?: boolean;
  fileId?: string; // to identify specific files
  cancelled?: boolean;
  serverFileName: string | null;
}

function usePicker(type: string) {
  const pickImage = async (): Promise<ImageUploadInfo | null | Asset[] | undefined> => {
    const count: number = type === 'profile' ? 1 : 0;
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: count,
      });
      if (result.cancelled) {
        return null;
      }
      if (type === 'profile') {
        const res = result?.assets?.[0];
        const pickedFile = res as ImageUploadInfo;
        pickedFile.fileId = rnd(10, rnd.alphaLower);
        pickedFile.uploaded = false;
        pickedFile.cancelled = false;
        return pickedFile;
      }

      return result?.assets;
    } catch (error) {
      // Alert.alert('Image could not be read');
      return null;
    }
  };

  return { pickImage };
}

export default usePicker;
