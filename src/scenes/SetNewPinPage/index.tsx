import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { usePin } from '@hooks/usePin';
import { View, Center, Button, ScrollView, Text, VStack } from 'native-base';
import React, { FC, memo, useState } from 'react';

const SetNewPinPage: FC = () => {
  const [token, setToken] = useState('');
  const [pin, setPin] = useState('');
  const { handleResetWithTokenPin, isLoading } = usePin();
  const handleDisabled = () => !pin || !token || pin.length < 4;

  return (
    <BackButtonTitleCenter title="Set New PIN">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <VStack mt="16">
          <Center mt="16">
            <Text mt="4" mb="2" color="CARDVESTBLACK.50" textAlign="center" fontSize="lg" fontWeight="bold">
              Set new pin
            </Text>
            <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" w="85%" fontWeight="light">
              Enter the token set to your email and set your new pin.
            </Text>
          </Center>
          <View marginTop="6">
            <Input type="text" label="Token" value={token} onChangeText={setToken} />
            <Input label="New PIN" maxLength="4" type="password" onChangeText={setPin} value={pin} />
          </View>
          <Center py="4">
            <Button
              onPress={() => handleResetWithTokenPin(pin, token)}
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

export default memo(SetNewPinPage);
