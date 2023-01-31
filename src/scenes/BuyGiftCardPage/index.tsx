/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useGetAllCategories, useGetGiftcardsToBuy } from '@api/hooks/useGiftcards';
import { useCreateBuyOrder } from '@api/hooks/useTransactions';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { FormSelect } from '@scenes/CalculatorPage';
import { Money } from '@scenes/DashboardPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { HStack, Text, View, VStack, Divider } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [category, setCategory] = useState<number>();
  const [comment, setComment] = useState('');
  const [giftCard, setGiftCard] = useState('');
  const [amountUSD, setAmountUSD] = useState(0);
  const { data } = useGetAllCategories();
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data: giftCardsData } = useGetGiftcardsToBuy({ category_id: Number(category) });
  const { mutate: buyGiftCard } = useCreateBuyOrder();
  const card = useMemo(() => {
    if (!giftCard) return;
    return giftCardsData?.data?.filter((card: any) => card.id === giftCard)?.[0];
  }, [giftCard]);
  const total = useMemo(() => {
    if (!card) return;
    const totalAmount = Number(card?.rates[currency]) * amountUSD;
    return totalAmount;
  }, [amountUSD, giftCardsData, currency]);
  const handleDisabled = () => !amountUSD || !giftCardsData || !category;
  const handleSubmit = async () => {
    try {
      await buyGiftCard({
        card_id: Number(giftCard),
        amount: Number(amountUSD),
        comment,
        currency,
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BackButtonTitleCenter
      isDisabled={handleDisabled()}
      title="Buy Giftcard"
      actionText="Place Order"
      action={() => handleSubmit()}>
      <View my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>
        <View p="3" />
        <FormSelect label="Select Category" value={category} setValue={setCategory} data={data?.data} />
        <View p="3" />
        <FormSelect label="Select Giftcard" value={giftCard} setValue={setGiftCard} data={giftCardsData?.data} />
        <View p="3" />
        <Input label="Amount in USD" value={amountUSD} onChangeText={setAmountUSD} />
        <View p="3" />
        <FormCurrencyPicker label="Payment Currency" setCurrency={handleSwitchCurrency} currency={currency} />
        <View p="3" />
        <VStack backgroundColor="#F7F9FB" px="3" py="4" borderRadius="lg">
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Current Rate:</Text>
            <Text color="CARDVESTGREY.100">
              {currency} {Money(Number(card?.rates[currency]) || 0, currency)}
            </Text>
          </HStack>
          <Divider />
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Total</Text>
            <Text color="black">
              {currency} {Money(total || 0, currency)}
            </Text>
          </HStack>
        </VStack>
        <View p="3" />
        <TextArea label="Comment (Optional)" value={comment} onChangeText={setComment} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardPage);
