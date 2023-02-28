import { Pic } from '@assets/SVG';
import { BoldText } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { Text, Button, Modal, Pressable, View, ScrollView, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FileUploader from './FileUploader';
import usePicker, { ImageUploadInfo, rnd } from './usePicker';

const AppButton = (props: any) => {
  return <Button {...props}>{props.title}</Button>;
};

interface MediaUploaderProps {
  onInit?: () => void;
  onImageUploaded?: (filenames: string[]) => void;
  onImageRemoved?: (filenames: string[]) => void;
  formFiles?: string[];
  CustomButton?: any;
  type?: string;
  noModal?: boolean;
}

export default function MediaUploader({
  formFiles,
  onInit,
  onImageUploaded,
  onImageRemoved,
  CustomButton,
  type,
  noModal,
}: MediaUploaderProps) {
  const queryClient = useQueryClient();
  const [isModalVisible, setModalVisible] = useState(false);
  const { pickImage } = usePicker(type);
  const [selectedImages, setSelectedImages] = useState<ImageUploadInfo[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [authToken, setAuthToken] = useState<string>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectImage = async () => {
    const image = await pickImage();
    if (image) {
      if (type !== 'profile') {
        image.map(img => {
          const pickedFile = img as ImageUploadInfo;
          pickedFile.fileId = rnd(10, rnd.alphaLower);
          pickedFile.uploaded = false;
          pickedFile.cancelled = false;
          setSelectedImages(prevSelectedImages => [...prevSelectedImages, pickedFile]);
        });
      } else {
        onOpenToast({
          status: 'info',
          message: 'Uploading image',
        });
        image.uploaded = false;
        setSelectedImages((prevSelectedImages: any[]) => [...prevSelectedImages, image]);
      }
    }
  };

  const removeImage = (fileToDelete: ImageUploadInfo) => {
    // Remove image from selected images list
    const filteredImages = selectedImages.filter((image, index) => {
      return image.fileId !== fileToDelete.fileId;
    });
    setSelectedImages(() => filteredImages);

    // Remove fileName from the list of uploaded fileNames
    const filteredFileNames = uploadedFiles.filter(imageUrl => {
      return imageUrl !== fileToDelete.serverFileName;
    });

    setUploadedFiles(() => filteredFileNames);

    if (onImageRemoved) onImageRemoved(filteredFileNames);
  };

  const closeUploader = () => {
    if (uploadedFiles.length <= 0) {
      onOpenToast({ status: 'error', message: 'Hey!, You have to upload at least one image to continue.' });
      return;
    }
    setModalVisible(false);
  };

  const updateImages = async (fileUploaded: ImageUploadInfo) => {
    setSelectedImages(prevSelectedImages => {
      // Update the uploaded property of the uploaded image
      // Mark Images as uploaded to avoid being uploaded again
      const updatedSelectedImages = prevSelectedImages.map(image => {
        if (image.fileId === fileUploaded.fileId) {
          return { ...image, uploaded: true, serverFileName: fileUploaded.serverFileName };
        }
        return image;
      });

      return updatedSelectedImages;
    });

    // Store Uploaded files
    setUploadedFiles(prevUploadedFiles => {
      return [...prevUploadedFiles, fileUploaded.serverFileName];
    });

    // call the callback function if supplied (useful for forms)
    if (type === 'profile') {
      if (onImageUploaded) onImageUploaded([fileUploaded.serverFileName]);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedImages([]);
      setModalVisible(false);
    } else {
      if (onImageUploaded) onImageUploaded([...uploadedFiles, fileUploaded.serverFileName]);
    }
  };

  useEffect(() => {
    const run = async () => {
      const authToken = await cacheService.get('login-user');
      setAuthToken(authToken);
    };
    run();
  }, []);

  useEffect(() => {
    if (onInit) onInit();
  }, []);

  useEffect(() => {
    if (formFiles) {
      if (formFiles.length == 0) {
        setSelectedImages([]);
        setUploadedFiles([]);
      }
    }
  }, [formFiles]);
  return (
    <View>
      {CustomButton && noModal ? (
        <>
          <CustomButton onPress={() => selectImage()} imgs={selectedImages} />
        </>
      ) : CustomButton && !noModal ? (
        <>
          <CustomButton onPress={toggleModal} imgs={selectedImages} />
        </>
      ) : (
        <>
          <AppButton icon={'image'} type="btnOutlinePrimary" outline title="Upload Image" onPress={toggleModal} />
          <Text style={{ textAlign: 'center', fontSize: 16 }}>{uploadedFiles.length} image(s) selected</Text>
        </>
      )}

      <Modal
        _backdrop={{ opacity: 0.006 }}
        isOpen={isModalVisible}
        size={'lg'}
        h="95%"
        onClose={() => setModalVisible(false)}
        animationPreset="slide">
        <Modal.Content>
          <View
            style={{
              // flex: 1,
              borderRadius: 16,
              // marginBottom: bottom,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 24,
              backgroundColor: 'white',
              width: '100%',
              height: '100%',
            }}>
            <View style={{ flex: 1, width: '100%' }}>
              <BoldText style={{ marginBottom: 8, textAlign: 'center' }}>Upload Images</BoldText>
              <Pressable style={styles.upload_area} onPress={() => selectImage()}>
                <View w="7" h="7">
                  <Pic />
                </View>
                <Text w="100%" textAlign="center">
                  Browse Image
                </Text>
              </Pressable>
              <Text style={{ fontSize: 14, fontStyle: 'italic', marginTop: 4 }}>
                Click on image thumbnail to cancel upload.
              </Text>
              <ScrollView style={styles.images}>
                {selectedImages.map((image, index) => (
                  <FileUploader
                    authToken={authToken}
                    onImageUploaded={updateImages}
                    onImageRemoved={removeImage}
                    type={type}
                    onUploadCancelled={file => {
                      // Mark Images as cancelled to avoid being uploaded again
                      selectedImages.map((image, index) => {
                        if (file.fileId == image.fileId) {
                          image.cancelled = true;
                        }
                        return image;
                      });
                    }}
                    key={image.fileId}
                    file={image}
                  />
                ))}
              </ScrollView>
              <VStack>
                {/*   onPress={() => setModalVisible(false)}
                  my="3"
                  size="lg"
                  p="4"
                  w="100%"
                  fontSize="md"
                  backgroundColor="CARDVESTGREEN"*/}
                <Pressable
                  fontSize="md"
                  p="4"
                  my="3"
                  backgroundColor="CARDVESTGREEN"
                  onPress={() => closeUploader()}
                  color="white">
                  <Text color="white" textAlign="center" w="100%">
                    Continue
                  </Text>
                </Pressable>
              </VStack>
            </View>
          </View>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  upload_area: {
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 24,
    borderRadius: 12,
  },
  images: {
    flex: 1,
    marginTop: 16,
  },
  image: {
    padding: 8,
    marginBottom: 12,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
  },
});
