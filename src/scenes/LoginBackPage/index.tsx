import { useLoginUser } from '@api/hooks/useAuth';
import { Bio, Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import UseFingerprint from '@hooks/useFingerPrint';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { validateEmail } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo, useState } from 'react';

const LoginBack: FC = () => {
  const { mutate: loginUser, isLoading } = useLoginUser();
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  const { showAuthenticationDialog } = UseFingerprint();
  const data: any = queryClient.getQueryData(['user']);
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    try {
      await loginUser({
        email: data?.email,
        password,
      });
      // await navigation.navigate('Dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  const handleDisabled = () => !data?.email || !password || isLoading || validateEmail(data?.email);
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center>
          <Box p="4" width={20} height={20}>
            <Logo />
          </Box>
          <Text mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl" fontWeight="bold">
            Welcome Back, {!data?.firstname && !data?.lastname && data?.username?.toString()}
            {data?.firstname && data?.lastname && data?.firstname?.toString()}
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your password to continue
          </Text>
        </Center>
        <View p="3">
          <Input type="password" label="Password" onChangeText={setPassword} />
          <Pressable mt="2" onPress={() => navigation.navigate('ForgetPassword')}>
            <Text textAlign="right" fontSize="md" color="CARDVESTGREEN">
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Center px="2">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            my="3"
            width="95%"
            size="lg"
            p="4"
            _text={{
              width: '150%',
            }}
            isLoading={isLoading}
            isLoadingText="Logging in"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Login
          </Button>
          <Pressable w="100%" mt="2" onPress={() => navigation.navigate('SignUp')}>
            <Text textAlign="center" fontSize="md" color="CARDVESTGREEN">
              Don’t have an account? <Text fontWeight={'bold'}>Create Account</Text>
            </Text>
          </Pressable>
          <Pressable onPress={showAuthenticationDialog} mt="10" p="4" width={20} height={20}>
            <Bio />
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(LoginBack);
