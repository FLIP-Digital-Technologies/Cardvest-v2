import { usePin } from '@hooks/usePin';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Text, Modal, Button, Pressable, View } from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';

const TransactionPinModal = ({
  closeModalVisible,
  modalVisible,
  handleSubmit,
}: {
  closeModalVisible: any;
  modalVisible: boolean;
  handleSubmit: any;
}) => {
  const [codeState, updateCode] = useState('');
  const { handleConfirmPin, isLoading } = usePin();
  const otpRef = useRef<OtpInputsRef>();

  const resetOTP = useCallback(() => {
    otpRef?.current?.reset();
  }, []);

  const handleSubmitPin = async () => {
    try {
      await handleConfirmPin(codeState);
      await closeModalVisible();
      await handleSubmit();
      await resetOTP();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={modalVisible} onClose={closeModalVisible} size={'lg'}>
      <Modal.Content maxH="212" bg="white">
        <Modal.Body>
          <Text textAlign="center" fontSize="lg" mb="2">
            Enter your transaction PIN
          </Text>
          <View>
            <OtpInputs
              handleChange={updateCode}
              numberOfInputs={4}
              inputStyles={{
                backgroundColor: '#efebeb',
                width: 40,
                height: 40,
                textAlign: 'center',
                fontSize: 20,
                margin: 5,
                borderRadius: 4,
              }}
              inputContainerStyles={{
                width: '18%',
              }}
              autofillFromClipboard
            />
          </View>
          <Button
            onPress={() => {
              handleSubmitPin();
            }}
            isLoading={isLoading}
            isDisabled={!codeState || codeState?.length < 3}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Withdraw
          </Button>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export const DelectAccountModal = ({
  closeModalVisible,
  delectAction,
  modalVisible,
  isLoading,
}: {
  closeModalVisible: any;
  delectAction: any;
  modalVisible: boolean;
  isLoading?: boolean;
}) => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <Modal isOpen={modalVisible} onClose={closeModalVisible} size={'md'}>
      <Modal.Content maxH="212">
        <Modal.Body>
          <Text w="80%" m="auto" mt="4" textAlign="center" fontSize="lg" mb="10">
            Are you sure you want to remove account? This cannot be undone
          </Text>
          <Button.Group>
            <Button
              width="48%"
              onPress={() => {
                closeModalVisible();
              }}
              variant="outline"
              color={'black'}
              borderRadius="lg"
              backgroundColor={'#fff'}>
              Cancel
            </Button>
            <Button
              w="48%"
              onPress={() => {
                delectAction();
              }}
              isLoading={isLoading}
              borderRadius="lg"
              backgroundColor={'#D00000'}>
              Remove
            </Button>
          </Button.Group>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default TransactionPinModal;
