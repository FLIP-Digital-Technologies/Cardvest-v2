import { useResendVerificationEmail } from '@api/hooks/useUser';
import { Mail } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, ScrollView, Pressable } from 'native-base';
import React, { FC, memo } from 'react';

const ResendVerifyEmail: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { mutate: resendVerificationEmail } = useResendVerificationEmail();
  const handleSubmit = async () => {
    try {
      await resendVerificationEmail();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center>
          <Box width={120} height={120}>
            <Mail />
          </Box>
          <Text mt="4" color="CARDVESTGREEN" textAlign="center" fontSize="3xl" fontWeight="medium">
            Verify Your Email
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            A verification email has been sent to the e-mail address you provided. Check your spam folder if not in
            inbox.
          </Text>
        </Center>
        <Pressable mt="2" onPress={() => handleSubmit()}>
          <Text textAlign="center" fontSize="md" color="CARDVESTGREEN">
            Didn't get the mail? <Text fontWeight={'bold'}>Resend</Text>
          </Text>
        </Pressable>
        <View mt="10" />
        <Center px="4">
          <Button
            onPress={() => navigation.goBack()}
            my="3"
            width="95%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Go Back
          </Button>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(ResendVerifyEmail);
