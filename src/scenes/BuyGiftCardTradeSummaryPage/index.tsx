import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, VStack, HStack } from 'native-base';
import React, { FC, memo } from 'react';

export const SummaryPanel = ({
  titleOne,
  titleTwo,
  bodyOne,
  bodyTwo,
}: {
  titleOne: string;
  titleTwo: string;
  bodyOne: string;
  bodyTwo: string;
}) => {
  return (
    <React.Fragment>
      <View p="3" />
      <VStack>
        <HStack my="2" justifyContent="space-between">
          <Text color="CARDVESTGREY.50">{titleOne}</Text>
          <Text color="CARDVESTGREY.50">{titleTwo}</Text>
        </HStack>
        <HStack my="1" justifyContent="space-between">
          <Text color="CARDVESTGREY.900">{bodyOne}</Text>
          <Text color="CARDVESTGREY.900">{bodyTwo}</Text>
        </HStack>
      </VStack>
      <View p="3" />
    </React.Fragment>
  );
};

const BuyGiftCardTradeSummaryPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Trade Summary"
      actionText="Place Order"
      action={() => navigation.navigate('BuyGiftCardTradeFeedbackPage')}>
      <View mt="7" mb="20">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Confirm the transaction details
        </Text>
        <SummaryPanel
          titleOne="Date & Time"
          titleTwo="Giftcard Value"
          bodyOne="October 22, 2022 | 3:45pm"
          bodyTwo="400"
        />
        <SummaryPanel titleOne="Amount" titleTwo="Payment Wallet" bodyOne="NGN 400,000.00" bodyTwo="NGN" />
        <SummaryPanel titleOne="Giftcard Category" titleTwo="Giftcard Type" bodyOne="iTunes" bodyTwo="iTunes UK" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardTradeSummaryPage);
