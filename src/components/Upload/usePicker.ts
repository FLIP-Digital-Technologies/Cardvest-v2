/* eslint-disable no-useless-escape */
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

export interface ImageUploadInfo {
  /**
   * URI to the local image or video file (usable as the source of an `Image` element, in the case of
   * an image) and `width` and `height` specify the dimensions of the media.
   */
  uri: string;
  /**
   * The unique ID that represents the picked image or video, if picked from the library. It can be used
   * by [expo-media-library](./media-library) to manage the picked asset.
   *
   * > This might be `null` when the ID is unavailable or the user gave limited permission to access the media library.
   * > On Android, the ID is unavailable when the user selects a photo by directly browsing file system.
   *
   * @platform ios
   * @platform android
   */
  assetId?: string | null;
  /**
   * Width of the image or video.
   */
  width: number;
  /**
   * Height of the image or video.
   */
  height: number;
  /**
   * The type of the asset.
   */
  type?: 'image' | 'video';
  /**
   * Preferred filename to use when saving this item. This might be `null` when the name is unavailable
   * or user gave limited permission to access the media library.
   *
   * @platform ios
   */
  fileName?: string | null;
  /**
   * File size of the picked image or video, in bytes.
   *
   * @platform ios
   */
  fileSize?: number;
  /**
   * The `exif` field is included if the `exif` option is truthy, and is an object containing the
   * image's EXIF data. The names of this object's properties are EXIF tags and the values are the
   * respective EXIF values for those tags.
   */
  exif?: Record<string, any> | null;
  /**
   * When the `base64` option is truthy, it is a Base64-encoded string of the selected image's JPEG data, otherwise `null`.
   * If you prepend this with `'data:image/jpeg;base64,'` to create a data URI,
   * you can use it as the source of an `Image` element; for example:
   * ```ts
   * <Image
   *   source={{ uri: 'data:image/jpeg;base64,' + asset.base64 }}
   *   style={{ width: 200, height: 200 }}
   * />
   * ```
   */
  base64?: string | null;
  /**
   * Length of the video in milliseconds or `null` if the asset is not a video.
   */
  duration?: number | null;
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
