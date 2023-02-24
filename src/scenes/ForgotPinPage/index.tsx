import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { usePin } from '@hooks/usePin';
import { View, Center, Button, ScrollView, Text, VStack } from 'native-base';
import React, { FC, memo, useState } from 'react';

const ForgotPinPage: FC = () => {
  const [password, setPassword] = useState('');
  const { handleResetPin, isLoading } = usePin();
  const handleDisabled = () => !password;

  return (
    <BackButtonTitleCenter title="Reset PIN">
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
            <Input type="password" label="Password" value={password} onChangeText={setPassword} />
          </View>
          <Center py="4">
            <Button
              onPress={() => handleResetPin(password)}
              isDisabled={handleDisabled()}
              isLoading={isLoading}
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
