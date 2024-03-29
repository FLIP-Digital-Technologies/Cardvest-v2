import { useMixpanel } from '@MixpanelAnalytics';
import { useCreateBuyOrder } from '@api/hooks/useTransactions';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import * as dayjs from 'dayjs';
import { HStack, Text, VStack, View } from 'native-base';
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

const BuyGiftCardTradeSummaryPage: FC = (props: any) => {
  const { route } = props;
  const { params = { buyGiftCard: {} } } = route;
  const { buyGiftCard } = params;
  const { mutate: buyGiftCardAction, isLoading } = useCreateBuyOrder();
  const [mixpanel, user] = useMixpanel();
  const handleSubmit = async () => {
    try {
      mixpanel.identify(user?.id?.toString());
      mixpanel.track('Buy GiftCard Attempt');
      await buyGiftCardAction({
        card_id: Number(buyGiftCard?.giftCard),
        amount: Number(buyGiftCard?.amountUSD),
        comment: buyGiftCard?.comment,
        currency: buyGiftCard?.currency,
      });
    } catch (e) {
      console.error('buy gift card ', e);
    }
  };

  return (
    <BackButtonTitleCenter
      isLoading={isLoading}
      title="Trade Summary"
      actionText="Place Order"
      action={() => handleSubmit()}>
      <View mt="7" mb="20">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Confirm the transaction details
        </Text>
        <SummaryPanel
          titleOne="Date & Time"
          titleTwo="Giftcard Value"
          bodyOne={dayjs.default().format('MMMM DD, YYYY | hh:mmA')}
          bodyTwo={buyGiftCard?.rate}
        />
        <SummaryPanel
          titleOne="Amount"
          titleTwo="Payment Wallet"
          bodyOne={buyGiftCard?.total}
          bodyTwo={buyGiftCard?.currency}
        />
        <SummaryPanel
          titleOne="Giftcard Category"
          titleTwo="Giftcard Type"
          bodyOne={buyGiftCard?.card?.category_name}
          bodyTwo={buyGiftCard?.card?.name}
        />
        <SummaryPanel titleOne="Comments" bodyOne={buyGiftCard?.comment} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardTradeSummaryPage);
