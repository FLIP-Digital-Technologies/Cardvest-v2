import { Bio, Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const ForgetPasswordEnterEmail: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <ScrollView
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
            Forget Password
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Please Enter the email address of your account
          </Text>
        </Center>
        <View p="3" mx="3">
          <Input label="Email Address" />
        </View>
        <Center px="4">
          <Button
            onPress={() => navigation.navigate('Reset')}
            my="3"
            width="95%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Reset Password
          </Button>
          <Pressable mt="2" onPress={() => navigation.navigate('SignUp')}>
            <Text fontSize="md" color="CARDVESTGREEN">
              Don’t have an account? <Text fontWeight={'bold'}>Create Account</Text>
            </Text>
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(ForgetPasswordEnterEmail);
