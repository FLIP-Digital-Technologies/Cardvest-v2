import { AddGreen } from '@assets/SVG';
import Input from '@components/Input';
import TransactionPinModal from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Button, Divider, HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';

const WithdrawalPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <BackButtonTitleCenter title="Withdraw Funds">
      <TransactionPinModal {...{ modalVisible, closeModalVisible: () => setModalVisible(false) }} />
      <View my="7">
        <Input label="Select Wallet" />
        <View p="3" />
        <Input label="Amount" />
        <View p="3" />
        <Input label="Withdrawal Account" />
        <View p="3" />
        <Pressable onPress={() => navigation.navigate('AddAccount')}>
          <HStack alignItems="center" justifyContent="center">
            <View w="6" h="6">
              <AddGreen />
            </View>
            <Text mx="2" color="CARDVESTGREEN">
              Add new account
            </Text>
          </HStack>
        </Pressable>
        <View p="3" />
        <VStack>
          <Button
            onPress={() => setModalVisible(true)}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Withdraw Funds
          </Button>
          <View position="relative">
            <Divider my="60px" backgroundColor="#909090" />
            <View backgroundColor="#EFEFEF" w="6" zIndex={9} position="absolute" top="40%" left="45%" right="0%">
              <Text m="auto">OR</Text>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate('WithdrawalUSDT')}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="SUN_FLOWER"
            color="black">
            <Text px="1" fontSize="lg" color="black">
              Withdraw USDT
            </Text>
          </Button>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalPage);
