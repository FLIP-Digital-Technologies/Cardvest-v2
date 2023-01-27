import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { onOpenToast } from '@utils/toast';
import { Button, Text, VStack, View, useToken } from 'native-base';
import React, { FC, memo, useState } from 'react';
import OtpInputs from 'react-native-otp-inputs';

const SetTransactionPin: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [codeState, updateCode] = useState('');
  const [codeConfirmState, updateCodeConfirm] = useState('');
  const [confirm, setConfirm] = useState(false);
  const handleChange = (code: string) => {
    if (confirm) return updateCodeConfirm(code);
    return updateCode(code);
  };
  const handleSubmit = () => {
    if (codeState === codeConfirmState) return navigation.navigate('Login');
    onOpenToast({
      status: 'error',
      message: 'Code are not the same',
    });
  };
  return (
    <BackButtonTitleCenter backAction={confirm ? () => setConfirm(false) : null} title="Set Transaction PIN">
      {confirm ? (
        <VStack h="full" justifyContent="center" alignItems="center">
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Confirm your 4-digit PIN
          </Text>
          <View h="24" my="4" w="full">
            <OtpInputs
              handleChange={handleChange}
              numberOfInputs={4}
              inputStyles={{
                backgroundColor: '#F7F9FB',
                width: 65,
                height: 65,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
                borderRadius: 4,
              }}
              inputContainerStyles={{
                width: '20%',
              }}
              autofillFromClipboard
            />
          </View>
          {/* <VStack> */}
          <Button
            onPress={() => handleSubmit()}
            my="3"
            size="lg"
            _text={{
              width: '150%',
              textAlign: 'center',
            }}
            w="100%"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Continue
          </Button>
        </VStack>
      ) : (
        <VStack h="full" justifyContent="center" alignItems="center">
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Create a 4-digit PIN.
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            This will be used for all transactions
          </Text>
          <View h="24" my="4" w="full">
            <OtpInputs
              handleChange={handleChange}
              numberOfInputs={4}
              inputStyles={{
                backgroundColor: '#F7F9FB',
                width: 65,
                height: 65,
                textAlign: 'center',
                fontSize: 20,
                margin: 10,
                borderRadius: 4,
              }}
              inputContainerStyles={{
                width: '20%',
              }}
              autofillFromClipboard
            />
          </View>
          {/* <VStack> */}
          <Button
            onPress={() => setConfirm(true)}
            my="3"
            size="lg"
            _text={{
              width: '150%',
              textAlign: 'center',
            }}
            w="100%"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Continue
          </Button>
          {/* </VStack> */}
        </VStack>
      )}
    </BackButtonTitleCenter>
  );
};

export default memo(SetTransactionPin);
