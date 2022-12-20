import { Bio, Logo } from '@assets/SVG';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const Login: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <ScrollView
      _contentContainerStyle={{
        padding: '15px',
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
  );
};

export default memo(Login);
