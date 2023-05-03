import { FBAccount, IGAccount, LinkedInAccount, TwitterAccount } from '@assets/SVG';
import { usePin } from '@hooks/usePin';
import { Text, Modal, Button, Pressable, View, Spacer, HStack, Link } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import OtpInputs, { OtpInputsRef } from 'react-native-otp-inputs';

export const ConnectWithUsModal = ({
  closeModalVisible,
  modalVisible,
}: {
  closeModalVisible: any;
  modalVisible: boolean;
}) => {
  return (
    <Modal isOpen={modalVisible} onClose={closeModalVisible} size={'lg'}>
      <Modal.Content maxH="212" bg="white">
        <Modal.Body>
          <Text textAlign="center" fontSize="lg" mb="2">
            Connect with Us
          </Text>
          <HStack mt="3">
            <Link isExternal href="https://www.instagram.com/cardvestng/">
              <View w="16" h="16">
                <IGAccount />
              </View>
            </Link>
            <Spacer />
            <Link isExternal href="http://twitter.com/cardvest">
              <View w="16" h="16">
                <TwitterAccount />
              </View>
            </Link>
            <Spacer />
            <Link isExternal href="https://facebook.com/cardvest">
              <View w="16" h="16">
                <FBAccount />
              </View>
            </Link>
            <Spacer />
            <Link isExternal href="http://tiktok.com/@cardvest">
              <View w="16" h="16">
                <LinkedInAccount />
              </View>
            </Link>
          </HStack>
          <Pressable
            onPress={() => {
              closeModalVisible();
            }}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            w="100%"
            textAlign="center"
            color="back">
            <Text textAlign="center" underline>
              Go Back
            </Text>
          </Pressable>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

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
      await resetOTP();
      await closeModalVisible();
      await handleSubmit();
    } catch (err) {
      console.error('submit pin', err);
    }
  };

  return (
    <Modal isOpen={modalVisible} onClose={closeModalVisible} size={'lg'}>
      <Modal.Content maxH="230" bg="white">
        <Modal.Body>
          <Text textAlign="center" fontSize="lg" mb="6">
            Enter your transaction PIN
          </Text>
          <View>
            <OtpInputs
              handleChange={updateCode}
              numberOfInputs={4}
              inputStyles={{
                backgroundColor: '#F7F9FB',
                width: 60,
                height: 60,
                textAlign: 'center',
                fontSize: 20,
                margin: 2,
                borderRadius: 4,
                color: 'black',
              }}
              secureTextEntry
              inputContainerStyles={{
                width: '20%',
              }}
              autofillFromClipboard={false}
            />
          </View>
          <Button
            onPress={() => {
              handleSubmitPin();
            }}
            isLoading={isLoading}
            isDisabled={!codeState || codeState?.length < 3}
            mb="4"
            mt="6"
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
