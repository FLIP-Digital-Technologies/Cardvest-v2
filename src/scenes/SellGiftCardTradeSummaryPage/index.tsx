import { useMixpanel } from '@MixpanelAnalytics';
import { useCreateSellOrder } from '@api/hooks/useTransactions';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { UploadPanel } from '@scenes/SellGiftCard';
import * as dayjs from 'dayjs';
import { View, Text, VStack, HStack } from 'native-base';
import React, { FC, memo } from 'react';

export const SummaryPanel = ({
  titleOne,
  titleTwo,
  bodyOne,
  bodyTwo,
}: {
  titleOne: string;
  titleTwo?: string;
  bodyOne: string;
  bodyTwo?: string;
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

const SellGiftCardTradeSummaryPage: FC = (props: any) => {
  const { route } = props;
  const { params = { sellGiftCard: {} } } = route;
  const { sellGiftCard } = params;
  const { mutate: sellGiftCardAction, isLoading } = useCreateSellOrder();
  const [mixpanel, user] = useMixpanel();
  const handleSubmit = async () => {
    try {
      mixpanel.identify(user?.id?.toString());
      mixpanel.track('Sell GiftCard Attempt');
      await sellGiftCardAction({
        card_id: Number(sellGiftCard?.giftCard),
        amount: Number(sellGiftCard?.amountUSD),
        comment: sellGiftCard?.comment,
        currency: sellGiftCard?.currency,
        images: sellGiftCard?.images,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <BackButtonTitleCenter
      isLoading={isLoading}
      title="Trade Summary"
      actionText="Sell Giftcard"
      action={() => handleSubmit()}>
      <View mt="7" mb="10">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Confirm the transaction details
        </Text>
        <SummaryPanel
          titleOne="Date & Time"
          titleTwo="Giftcard Value"
          bodyOne={dayjs.default().format('MMMM DD, YYYY | hh:mmA')}
          bodyTwo={sellGiftCard?.rate}
        />
        <SummaryPanel
          titleOne="Amount"
          titleTwo="Payment Wallet"
          bodyOne={sellGiftCard?.total}
          bodyTwo={sellGiftCard?.currency}
        />
        <SummaryPanel
          titleOne="Giftcard Category"
          titleTwo="Giftcard Type"
          bodyOne={sellGiftCard?.card?.category_name}
          bodyTwo={sellGiftCard?.card?.name}
        />
        <SummaryPanel titleOne="Comments" bodyOne={sellGiftCard?.comment} />
        <VStack mt="2">
          <Text color="CARDVESTGREY.50">Uploaded Images</Text>
          {sellGiftCard?.images.map((image: string, index: number) => (
            <UploadPanel key={index} source={image} showIcon={false} />
          ))}
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(SellGiftCardTradeSummaryPage);
