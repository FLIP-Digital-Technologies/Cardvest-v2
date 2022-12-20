import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { UploadPanel } from '@scenes/SellGiftCard';
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

const SellGiftCardTradeSummaryPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Trade Summary"
      actionText="Sell Giftcard"
      action={() => navigation.navigate('SellGiftCardTradeFeedbackPage')}>
      <View mt="7" mb="10">
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
        <VStack mt="2">
          <Text color="CARDVESTGREY.50">Uploaded Images</Text>
          <UploadPanel showIcon={false} />
          <UploadPanel showIcon={false} />
          <UploadPanel showIcon={false} />
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(SellGiftCardTradeSummaryPage);
