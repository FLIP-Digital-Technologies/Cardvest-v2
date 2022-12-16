import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Text, Modal, Button } from 'native-base';
import React from 'react';

const TransactionPinModal = ({
  closeModalVisible,
  modalVisible,
}: {
  closeModalVisible: any;
  modalVisible: boolean;
}) => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <Modal isOpen={modalVisible} onClose={closeModalVisible} size={'md'}>
      <Modal.Content maxH="212">
        <Modal.Body>
          <Text textAlign="center" fontSize="lg" mb="2">
            Enter your transaction PIN
          </Text>
          <Button
            onPress={() => {
              closeModalVisible();
              navigation.navigate('WithdrawalFeedback');
            }}
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

export default TransactionPinModal;
