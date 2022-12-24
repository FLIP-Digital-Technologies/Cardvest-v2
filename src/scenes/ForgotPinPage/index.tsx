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
