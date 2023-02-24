import { useModifyUser } from '@api/hooks/useUser';
import { RedTrashOutline } from '@assets/SVG';
import Input from '@components/Input';
import MediaUploader from '@components/Upload/MediaUploader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { validateEmail } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { View, Text, Center, Button, Box, Pressable, ScrollView, Avatar, HStack, VStack } from 'native-base';
import React, { FC, memo, useCallback, useEffect, useState } from 'react';

const UploadButton = (props: any) => (
  <Pressable mt="2" {...props}>
    <Text color="CARDVESTGREEN" underline textAlign="center" fontSize="sm" fontWeight="light">
      Change Profile Pic
    </Text>
  </Pressable>
);

const ProfilePage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { mutate: updateUser, isLoading } = useModifyUser();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['user']);
  const [img, setImg] = useState<string>(data?.image_url);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [firstname, setFirstName] = useState(data?.firstname);
  const [lastname, setLastName] = useState(data?.lastname);
  const [email, setEmail] = useState(data?.email);
  const [username, setUsername] = useState(data?.username);
  const [phoneNumber, setPhoneNumber] = useState(data?.phonenumber);
  const handleSubmit = async () => {
    try {
      await updateUser({
        userId: data?.id,
        image_url: selectedImage[0],
        email,
        firstname,
        lastname,
        username,
        phonenumber: phoneNumber,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisabled = useCallback(() => {
    return (
      !email ||
      !username ||
      validateEmail(email) ||
      !phoneNumber ||
      !(phoneNumber.length >= 10) ||
      !(phoneNumber.length <= 11)
    );
  }, [phoneNumber]);

  useEffect(() => {
    if (selectedImage.length > 0) setImg(selectedImage[0]);
  }, [selectedImage]);

  return (
    <BackButtonTitleCenter title="My Profile">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center my="5">
          <Box p="4">
            <Avatar
              bg="cyan.500"
              borderColor="#F7F2DD"
              borderWidth="1"
              size="2xl"
              source={{
                uri: img,
              }}>
              {data?.username?.toString()[0]}
            </Avatar>
          </Box>
          <MediaUploader
            formFiles={selectedImage}
            noModal
            // onInit={() => {}}
            onImageRemoved={filenames => {
              setSelectedImage(filenames);
            }}
            onImageUploaded={filenames => {
              setSelectedImage(filenames);
            }}
            type="profile"
            CustomButton={UploadButton}
          />
        </Center>
        <View my="6">
          <Input label="First Name" value={firstname} onChangeText={setFirstName} />
          <Input label="Last Name" value={lastname} onChangeText={setLastName} />
          <Input label="Email Address" value={email} onChangeText={setEmail} disabled />
          <Input label="Username" value={username} onChangeText={setUsername} disabled />
          <Input label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        </View>
        <Center py="4">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            isLoading={isLoading}
            isLoadingText="Updating"
            my="3"
            width="100%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Update Profile
          </Button>
          <Button
            w="100%"
            onPress={() => navigation.navigate('DeleteAccount')}
            my="3"
            background="white"
            size="lg"
            p="4"
            fontSize="md">
            <HStack alignItems="center" mx="auto">
              <View w="7" h="7" mr="2">
                <RedTrashOutline />
              </View>
              <Text color="#FF303C">Delete Account</Text>
            </HStack>
          </Button>
        </Center>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ProfilePage);
