import { useModifyUser } from '@api/hooks/useUser';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { validateEmail } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { View, Text, Center, Button, Box, Pressable, ScrollView, Avatar } from 'native-base';
import React, { FC, memo, useCallback, useState } from 'react';

const ProfilePage: FC = () => {
  const { mutate: updateUser, isLoading } = useModifyUser();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['user']);
  const [email, setEmail] = useState(data?.email);
  const [username, setUsername] = useState(data?.username);
  const [phoneNumber, setPhoneNumber] = useState(data?.phonenumber);
  const handleSubmit = async () => {
    try {
      await updateUser({
        userId: data?.id,
        email,
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
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}>
              {data?.username?.toString()[0]}
            </Avatar>
          </Box>
          <Pressable mt="2" onPress={() => console.log('jeje')}>
            <Text color="CARDVESTGREEN" underline textAlign="center" fontSize="sm" fontWeight="light">
              Change Profile Pic
            </Text>
          </Pressable>
        </Center>
        <View my="6">
          <Input label="Email Address" value={email} onChangeText={setEmail} />
          <Input label="Username" value={username} onChangeText={setUsername} />
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
        </Center>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ProfilePage);
