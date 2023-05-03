import { Pic, RedTrash, Refresh, Success } from '@assets/SVG';
import env from '@env';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import axios, { AxiosError } from 'axios';
import { View, Text as AppText, Pressable, Image } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ImageUploadInfo, rnd, formatBytes } from './usePicker';

interface FileUploaderProps {
  file: ImageUploadInfo;
  onImageUploaded?: (file: ImageUploadInfo) => void;
  onImageRemoved?: (file: ImageUploadInfo) => void;
  onUploadCancelled?: (file: ImageUploadInfo) => void;
  authToken?: string;
  type?: string | undefined;
}

type UploadStatus = 'pending' | 'uploading' | 'uploaded' | 'failed' | 'cancelled';

export default function FileUploader({
  file,
  onImageUploaded,
  onImageRemoved,
  onUploadCancelled,
  type,
}: FileUploaderProps) {
  const [fileState, setFileState] = useState<UploadStatus>('pending');
  const [uploadFileName, setUploadFileName] = useState(); // Name returned from the server
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Upload progress
  const uploadControllerRef = useRef<AbortController>();

  const uploadImages = async (file: ImageUploadInfo | null) => {
    const fileToUpload = file;

    setFileState('uploading');

    // Create the abort controller
    let controller: AbortController;
    if (!uploadControllerRef.current) {
      controller = new AbortController();
      uploadControllerRef.current = controller;
    } else {
      controller = uploadControllerRef.current;
    }

    const token = await cacheService.get('login-user');

    const customAxiosInstance = axios.create({
      baseURL: env.API_URL,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      onUploadProgress(progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
      signal: controller.signal,
    });

    const formData = new FormData();

    if (fileToUpload.uploaded) return;

    // Get the images mimetype

    const field = type === 'profile' ? 'image' : 'file';

    formData.append(field, {
      uri: fileToUpload.uri,
      type: `image/${fileToUpload.uri.split('.').pop() === 'png' ? 'png' : 'jpeg'}`,
      name: rnd(16, rnd.alphaLower),
    } as unknown as Blob);

    try {
      const postUrl = type === 'profile' ? `/users/upload` : `/transactions/image-upload`;
      const response = await customAxiosInstance.post(postUrl, formData);

      const responseData = response.data;

      setFileState('uploaded');
      const serverFileName = type === 'profile' ? responseData.data : responseData.data.filename;
      setUploadFileName(uploadFileName);

      // Store  response in the data response field
      // Or call the callback function passed with the updated data response
      if (onImageUploaded) {
        // call the callback function with the uploaded file and mark as uploaded
        onImageUploaded({ ...file, uploaded: true, serverFileName });
      }

      onOpenToast({ status: 'success', message: 'Upload complete.' });
    } catch (error: any) {
      // Check if its an abort error
      if (error.name == 'CanceledError' || controller.signal.aborted) {
        setFileState('cancelled');
        setUploadProgress(100);

        if (onUploadCancelled) onUploadCancelled(file);
      }
      // Other types of error
      else {
        setFileState('failed');
        const _error = error as AxiosError;
        console.error('upload ', _error);
        if (_error.response) {
          const response: any = _error.response.data;

          if (response.includes('Large'))
            return onOpenToast({ status: 'error', message: 'Image is too large, upload image less than 1 mb' });
          // Check if the error object exists and also contains error values
          if (!response.errors || Object.keys(response.errors).length < 1) {
            onOpenToast({ status: 'error', message: response.message });
          }
          // Get the first validation error's key
          else {
            const firstErrorKey = Object.keys(response.errors)[0];
            if (!firstErrorKey) {
              onOpenToast({ status: 'error', message: response.message });
            }
            onOpenToast({ status: 'error', message: response.errors[firstErrorKey][0] ?? response.message });
          }
        } else {
          onOpenToast({ status: 'error', message: 'Check your network connection and try again.' });
        }
      }
    }
  };

  const retryUpload = () => {
    uploadImages(file);
  };

  const deleteUpload = () => {
    Alert.alert(
      'Confirm Delete',
      'Proceed to removing the selected image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            // Delete image on the server

            if (onImageRemoved) {
              onImageRemoved(file);
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  useEffect(() => {
    if (file.cancelled) {
      setUploadProgress(100);
      setFileState('cancelled');
    } else if (!file.uploaded) uploadImages(file);
    else {
      setUploadProgress(100);
      setFileState('uploaded');
    }

    return () => {
      if (uploadControllerRef.current) {
        uploadControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <View style={styles.imageBox}>
      <View style={[styles.uploader]}>
        <View
          style={[
            { backgroundColor: 'green', opacity: 0.2, height: '100%', width: `${uploadProgress}%` },
            fileState == 'failed' || fileState == 'cancelled' ? { backgroundColor: 'red' } : {},
          ]}
        />
      </View>
      <View>
        <Pressable
          onPress={() => {
            if (fileState == 'uploading') {
              uploadControllerRef.current.abort();
            }
          }}>
          {file.uri ? (
            <Image
              source={{ uri: file.uri }}
              width={80}
              height={50}
              alt={file.fileId ?? file.uri}
              style={{ height: 50, width: 80, borderRadius: 8 }}
            />
          ) : (
            <View w="7" h="7">
              <Pic />
            </View>
          )}
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 8, flex: 1 }}>
        <AppText numberOfLines={1} style={styles.title}>
          {file.uri.split('/')[file.uri.split('/').length - 1]}
        </AppText>
        <AppText style={styles.subtitle}>{formatBytes(file.fileSize)}</AppText>

        {fileState === 'pending' && <AppText style={styles.pending}>File Selected</AppText>}
        {fileState === 'failed' && <AppText style={styles.error}>Failed</AppText>}
        {fileState === 'cancelled' && (
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <AppText style={styles.error}>Cancelled</AppText>
            <Pressable onPress={deleteUpload} w="5" h="7" style={{ marginLeft: 4 }}>
              <RedTrash />
            </Pressable>
          </View>
        )}
        {fileState === 'uploading' && <AppText style={styles.pending}>Uploading...</AppText>}
        {fileState === 'uploaded' && (
          <View style={{ justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <AppText style={styles.success}>Completed {file.uploaded}</AppText>
            <View w="5" h="7" style={{ marginLeft: 4 }}>
              <Success />
            </View>
          </View>
        )}
      </View>
      {file.uploaded && type !== 'profile' && (
        <Pressable
          onPress={deleteUpload}
          style={{
            width: 36,
            height: 36,
            backgroundColor: '#ffffff55',
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View w="7" h="7">
            <RedTrash />
          </View>
        </Pressable>
      )}
      {!file.uploaded && fileState == 'failed' && (
        <Pressable
          onPress={retryUpload}
          style={{
            width: 36,
            height: 36,
            backgroundColor: '#ffffff55',
            borderRadius: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View w="7" h="7">
            <Refresh />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    fontStyle: 'italic',
  },
  pending: {
    color: '#1d1d1d',
    fontSize: 12,
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageBox: {
    padding: 8,
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
  },
  uploader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // zIndex: 1,
    backgroundColor: '#dcdcdc',
  },
});
