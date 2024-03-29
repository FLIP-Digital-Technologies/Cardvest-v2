import { forgotPassword } from '@api/Auth/auth';
import { Bio, Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BoldText, validateEmail } from '@scenes/LoginPage';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo, useState } from 'react';

const ForgetPasswordEnterEmail: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await forgotPassword({
        email,
      });
      setIsLoading(false);
      await navigation.navigate('Reset', {
        email,
      });
    } catch (error) {
      setIsLoading(false);
      console.error('forgot password ', error);
    }
  };
  const handleDisabled = () => !email || isLoading || validateEmail(email);
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
          <BoldText mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="lg">
            Forgot Password
          </BoldText>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" w="85%" fontWeight="light">
            Please enter the email address of your account
          </Text>
        </Center>
        <View p="3">
          <Input label="Email Address" onChangeText={setEmail} />
        </View>
        <Center px="2">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            my="3"
            width="95%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Submit
          </Button>
          <Pressable mt="2" onPress={() => navigation.navigate('Login')}>
            <Text fontSize="md" color="CARDVESTGREEN">
              Remember password? <Text fontWeight={'bold'}>Login</Text>
            </Text>
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(ForgetPasswordEnterEmail);
