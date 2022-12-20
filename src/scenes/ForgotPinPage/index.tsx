import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Center, Button, ScrollView, Text, VStack } from 'native-base';
import React, { FC, memo } from 'react';

const ForgotPinPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Change PIN">
      <ScrollView
        _contentContainerStyle={{
          padding: '0px 20px',
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <VStack mt="16">
          <Center mt="16">
            <Text mt="4" mb="2" color="CARDVESTBLACK.50" textAlign="center" fontSize="lg" fontWeight="bold">
              Confirm Password
            </Text>
            <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" w="85%" fontWeight="light">
              Enter your account password to continue
            </Text>
          </Center>
          <View marginTop="6">
            <Input label="" />
          </View>
          <Center py="4">
            <Button
              onPress={() => navigation.navigate('ResetPinFeedback')}
              my="3"
              width="100%"
              size="lg"
              p="4"
              fontSize="md"
              backgroundColor="CARDVESTGREEN"
              color="white">
              Reset PIN
            </Button>
          </Center>
        </VStack>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ForgotPinPage);
/* <CSafeAreaView>
<ScrollView
  showsVerticalScrollIndicator={false}
_contentContainerStyle={{
    padding: '20px',
    flex: 1,
    justifyContent: 'center',
  }}
  showsVerticalScrollIndicator={false}>
  <Center>
    <Box p="4" width={20} height={20}>
      <Logo />
    </Box>
    <Text mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl" fontWeight="bold">
      Welcome
    </Text>
    <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
      Enter your details to login
    </Text>
  </Center>
  <View p="3" mx="3">
    <Input label="Email Address" />
    <Input label="Password" />
    <Pressable mt="2" onPress={() => navigation.navigate('ForgetPassword')}>
      <Text textAlign="right" fontSize="md" color="CARDVESTGREEN">
        Forgot Password?
      </Text>
    </Pressable>
  </View>
  <Center px="4">
    <Button
      onPress={() => navigation.navigate('Dashboard')}
      my="3"
      width="95%"
      size="lg"
      p="4"
      fontSize="md"
      backgroundColor="CARDVESTGREEN"
      color="white">
      Login
    </Button>
    <Pressable mt="2" onPress={() => navigation.navigate('SignUp')}>
      <Text fontSize="md" color="CARDVESTGREEN">
        Don’t have an account? <Text fontWeight={'bold'}>Create Account</Text>
      </Text>
    </Pressable>
    <Box mt="10" p="4" width={20} height={20}>
      <Bio />
    </Box>
  </Center>
</ScrollView>
</CSafeAreaView> */
