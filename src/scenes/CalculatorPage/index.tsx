import { Exchange, GHS, NGN } from '@assets/SVG';
import Input from '@components/Input';
import TransactionPinModal from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, HStack, Text, View, VStack, Select, CheckIcon, Divider } from 'native-base';
import React, { FC, memo } from 'react';

const Calculator: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Calculator"
      actionText="Proceed to Trade"
      action={() => navigation.navigate('SellCard')}>
      <View mt="7" mb="5">
        <Input label="Select Category" />
        <View p="3" />
        <Input label="Select Giftcard" />
        <View p="3" />
        <Input label="Amount in USD" />
        <View p="3" />
        <Input label="Payout Currency" />
        <View p="3" />
        <VStack backgroundColor="#F7F9FB" px="3" py="4" borderRadius="lg">
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Current Rate:</Text>
            <Text color="CARDVESTGREY.100">NGN 400</Text>
          </HStack>
          <Divider />
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Total</Text>
            <Text color="black">NGN 400,000</Text>
          </HStack>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(Calculator);
