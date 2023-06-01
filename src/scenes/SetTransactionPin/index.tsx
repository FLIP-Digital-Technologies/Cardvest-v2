import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { usePin } from '@hooks/usePin';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { Button, Text, VStack, View, useToken } from 'native-base';
import React, { FC, memo, useLayoutEffect, useState } from 'react';
import OtpInputs from 'react-native-otp-inputs';

const SetTransactionPin: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { handleSetUpTransactionPin, codeState, updateCode, codeConfirmState, updateCodeConfirm, isLoading } = usePin();
  const [confirm, setConfirm] = useState(false);
  const [user, setUser] = useState<any>();

  const handleChange = (code: string) => {
    if (confirm) return updateCodeConfirm(code);
    return updateCode(code);
  };

  const handleSubmit = async () => {
    if (codeConfirmState !== codeState) {
      return onOpenToast({
        status: 'error',
        message: 'Please check that your credentials are valid.',
      });
    }
    try {
      await handleSetUpTransactionPin();

      // Firebase Analytics: Created Pin Event
      await analytics().logEvent('created_pin', {
        user_id: user?.id,
        username: user?.username,
      });

      navigation.navigate('Dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const res = await cacheService.get('user');
        if (JSON.parse(res || '{}')) {
          setUser(JSON.parse(res || '{}'));
          console.log('userID -set', res);
        }
        return res;
      } catch (error) {
        console.error('errr in set transaction - no user id -', JSON.stringify(error));
      }
    }
    fetchData();
  });

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
            isLoading={isLoading}
            my="3"
            size="lg"
            _text={{
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
