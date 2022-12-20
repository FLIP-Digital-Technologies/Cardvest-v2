import Input from '@components/Input';
import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, HStack, Text, View, VStack, Divider } from 'native-base';
import React, { FC, memo } from 'react';

const BuyGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Buy Giftcard"
      actionText="Place Order"
      action={() => navigation.navigate('BuyGiftCardTradeSummaryPage')}>
      <View my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>
        <View p="3" />
        <Input label="Select Category" />
        <View p="3" />
        <Input label="Select Giftcard" />
        <View p="3" />
        <Input label="Amount in USD" />
        <View p="3" />
        <Input label="Payment Wallet" />
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
        <View p="3" />
        <TextArea label="Comment (Optional)" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardPage);
