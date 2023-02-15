import env from '@env';
import { cacheService } from '@utils/cache';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from 'react-native-image-picker';

export const useUpload = type => {
  const [imgs, setImgs] = useState(null);
  const selectFile = async () => {
    try {
      const results = await ImagePicker.launchImageLibrary({});
      console.log(results);
      uploadImage(results?.assets);
      return results;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  async function uploadFile(file) {
    const token = await cacheService.get('login-user');
    const customAxiosInstance = axios.create({
      baseURL: env.API_URL,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      // onUploadProgress(progressEvent) {
      //   const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      //   setUploadProgress(percentCompleted);
      // },
      // signal: controller.signal,
    });
    const formData = new FormData();
    if (file.uploaded) return;
    // Get the images mimetype
    formData.append('image', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
    const res = await customAxiosInstance.post(
      type === 'profile' ? `/users/upload` : `/transactions/image-upload`,
      formData,
    );
    return res;
    // return ReactNativeBlobUtil.fetch(
    //   'POST',
    //   type === 'profile' ? `${env.API_URL}/users/upload` : `${env.API_URL}/transactions/image-upload`,
    //   {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/octet-stream',
    //   },
    //   ReactNativeBlobUtil.wrap(decodeURIComponent(cleanURi)),
    // );
  }

  async function uploadImage(results) {
    let data = [];
    const requests = await results.map(file => {
      //create a promise for each API call
      return new Promise((resolve, reject) => {
        uploadFile(file)
          .then(res => resolve(res.data))
          .catch(err => reject(err));
      });
    });
    await Promise.all(requests)
      .then(body => {
        const b = body.map(i => JSON.parse(i));
        data = b;
      })
      .catch(err => console.log(err, 'hjghfdg'));
    console.log(data);
    return data;
  }

  return {
    imgs,
    uploadImage,
    setImgs,
    selectFile,
    uploadFile,
  };
};
