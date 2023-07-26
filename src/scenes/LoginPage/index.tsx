import { useLoginUser } from '@api/hooks/useAuth';
import { Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, Button, Center, Pressable, ScrollView, Text, View } from 'native-base';
import React, { FC, memo, useState } from 'react';
import { Platform } from 'react-native';

export const BoldText = (props: any) => {
  if (Platform.OS === 'ios') {
    return (
      <Text fontWeight={'700'} {...props}>
        {props.children}
      </Text>
    );
  }
  return (
    <Text fontFamily="Satoshi-Bold" {...props}>
      {props.children}
    </Text>
  );
};

export const validateEmail = (value: string) => {
  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/i.test(value)) {
    return true;
  }
  return false;
};

const Login: FC = () => {
  const { mutate: loginUser, isLoading } = useLoginUser();
  const navigation = useNavigation<GenericNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    try {
      await loginUser({
        email,
        password,
      });
      // await navigation.navigate('Dashboard');
    } catch (error) {
      console.error('login ', error);
    }
  };
  const handleDisabled = () => !email || !password || isLoading || validateEmail(email);
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
          <BoldText mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl">
            Welcome
          </BoldText>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your details to login
          </Text>
        </Center>
        <View p="3">
          <Input label="Email Address" onChangeText={setEmail} />
          <Input type="password" label="Password" onChangeText={setPassword} />
          <Pressable mt="2" onPress={() => navigation.navigate('ForgetPassword')}>
            <Text textAlign="right" fontSize="md" color="CARDVESTGREEN">
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Center mb="5" px="2">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            my="3"
            width="95%"
            size="lg"
            p="4"
            isLoading={isLoading}
            isLoadingText="Logging in"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Login
          </Button>
          <Pressable mt="2" onPress={() => navigation.navigate('SignUp')}>
            <Text textAlign="center" fontSize="md" color="CARDVESTGREEN">
              Don’t have an account? <Text fontWeight={'bold'}>Create Account</Text>
            </Text>
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Login);
