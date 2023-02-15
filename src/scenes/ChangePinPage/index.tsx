import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { usePin } from '@hooks/usePin';
import { View, Center, Button, ScrollView } from 'native-base';
import React, { FC, memo, useState } from 'react';

const ChangePinPage: FC = () => {
  const {
    codeCurrentState,
    codeState,
    codeConfirmState,
    updateCodeCurrent,
    updateCode,
    updateCodeConfirm,
    handleChangePin,
    isLoading,
  } = usePin();
  const handleDisabled = () =>
    !codeCurrentState ||
    !codeState ||
    !codeConfirmState ||
    codeCurrentState?.length === 4 ||
    codeState?.length === 4 ||
    codeConfirmState?.length === 4;
  return (
    <BackButtonTitleCenter title="Change PIN">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View my="6">
          <Input
            label="Current PIN"
            maxLength="4"
            type="password"
            onChangeText={updateCodeCurrent}
            value={codeCurrentState}
          />
          <Input label="New PIN" maxLength="4" type="password" onChangeText={updateCode} value={codeState} />
          <Input
            label="Confirm PIN"
            maxLength="4"
            type="password"
            onChangeText={updateCodeConfirm}
            value={codeConfirmState}
          />
        </View>
        <Center py="4">
          <Button
            onPress={() => handleChangePin()}
            isDisabled={handleDisabled()}
            isLoading={isLoading}
            my="3"
            width="100%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Update PIN
          </Button>
        </Center>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ChangePinPage);
