import { useLoginUser } from '@api/hooks/useAuth';
import { Bio, Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo, useState } from 'react';

const Login: FC = () => {
  const { mutate: loginUser } = useLoginUser();
  const navigation = useNavigation<GenericNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsDisabled(true);
      await loginUser({
        email,
        password,
      });
      await navigation.navigate('Dashboard');
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(false);
      console.error(error);
    }
  };
  const handleDisabled = () => !email || !password || isDisabled;
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
            Welcome
          </Text>
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
        <Center px="4">
          <Button
            onPress={() => handleSubmit()}
            isLoading={isDisabled}
            isDisabled={handleDisabled()}
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
    </CSafeAreaView>
  );
};

export default memo(Login);
