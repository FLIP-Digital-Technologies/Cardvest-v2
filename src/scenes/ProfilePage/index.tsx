import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
// import { useNavigation } from '@react-navigation/native';
// import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, Pressable, ScrollView, VStack, Avatar } from 'native-base';
import React, { FC, memo } from 'react';

const ProfilePage: FC = () => {
  // const navigation = useNavigation<GenericNavigationProps>();
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
              TE
            </Avatar>
          </Box>
          <Pressable mt="2" onPress={() => console.log('jeje')}>
            <Text color="CARDVESTGREEN" underline textAlign="center" fontSize="sm" fontWeight="light">
              Change Profile Pic
            </Text>
          </Pressable>
        </Center>
        <View my="6">
          <Input label="Email Address" />
          <Input label="Username" />
          <Input label="Mobile Number" />
        </View>
        <Center py="4">
          <Button
            onPress={() => console.log('jeje')}
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
