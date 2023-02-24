import env from '@env';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const API_BASE = env.API_URL; // 192.168.1.1;

export const useUpload = (type: string) => {
  const [selectedImage, setSelectedImage] = useState([]);

  const openImagePickerAsync = async () => {
    console.log('pickerResult', ImagePicker);
    //   const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //     quality: 1,
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   });
    //   if (pickerResult.cancelled === true) return;
    //   setSelectedImage(pickerResult);
    //   console.log(pickerResult);
    // };

    // const onPressSelectMedia = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });
    console.log(response);
  };

  const uploadImage = async () => {
    if (!selectedImage) return;
    if (!canUpload) {
      alert('Cannot upload files larger than 2MB');
      setSelectedImage(undefined);
      return;
    }
    const uri = Platform.OS === 'android' ? selectedImage.uri : selectedImage.uri.replace('file://', '');
    const filename = selectedImage.uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const filetype = match ? `image/${match[1]}` : `image`;
    const half = type === 'profile' ? `/users/upload` : `/transactions/image-upload`;
    const formData = new FormData();
    formData.append('image', {
      uri,
      name: `image.${ext}`,
      type: filetype,
    } as any);
    try {
      const { data } = await axios.post(`${API_BASE}${half}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (!data.isSuccess) {
        alert('Image upload failed!');
        return;
      }
      console.log(data);
      alert('Image Uploaded');
    } catch (err) {
      console.log(err);
      alert('Something went wrong');
    } finally {
      setSelectedImage(undefined);
    }
  };

  // const [imgs, setImgs] = useState(null);
  // const selectFile = async () => {
  //   try {
  //     const results = await ImagePicker.launchImageLibrary({
  //   mediaType: 'photo',
  //   includeBase64: false,
  // });
  //     console.log(results);
  //     uploadImage(results?.assets);
  //     return results;
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else {
  //       throw err;
  //     }
  //   }
  // };
  // async function uploadImage(file: any) {
  //   const formData = new FormData();
  //   console.log(file);
  //   formData.append('file', file);
  //   try {
  //     const token = await cacheService.get('login-user');
  //     const half = type === 'profile' ? `/users/upload` : `/transactions/image-upload`;
  //     const res = await axios({
  //       method: 'post',
  //       url: `${env.API_URL}${half}`,
  //       data: formData,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(res);
  //     if (res.status === 200) {
  //       console.log('Image uploaded successfully!');
  //       return res.data;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // return custom error message from API if any
  //     if (error?.response?.status === 400 || error?.response?.status === 422) {
  //       console.error('Ooops!,an error occured while uploading trade!');
  //     } else if (error?.response?.status === 401) {
  //       // dispatch({ type: 'auth/Logout' });
  //     } else {
  //       return Promise.reject({ err: error.response });
  //     }
  //   }
  // }

  return {
    openImagePickerAsync, // button click action
    uploadImage,
    // imgs,
    // uploadImage,
    // setImgs,
    // selectFile,
    // uploadFile,
  };
};
// async function Upload({ file }: { file: any }) {
//   const formData = new FormData();
//   formData.append('file', file);
//   try {
//     const res = await axios({
//       method: 'post',
//       url: `${apiUrl}transactions/image-upload`,
//       data: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${getToken()}`,
//       },
//     });
//     if (res.status === 200) {
//       cogoToast.success('Image uploaded successfully!', {
//         position: 'bottom-right',
//       });
//       return res.data;
//     }
//   } catch (error) {
//     // return custom error message from API if any
//     if (error?.response?.status === 400 || error?.response?.status === 422) {
//       console.error('Ooops!,an error occured while uploading trade!');
//     } else if (error?.response?.status === 401) {
//       // dispatch({ type: 'auth/Logout' });
//     } else {
//       return Promise.reject({ err: error.response });
//     }
//   }
// }
