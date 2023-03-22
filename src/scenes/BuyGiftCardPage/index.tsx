/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useGetAllBuyCategories, useGetGiftcardsToBuy } from '@api/hooks/useGiftcards';
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
  const [amountUSD, setAmountUSD] = useState(0);
  const { data } = useGetAllBuyCategories();
  const { currency, handleSwitchCurrency } = useCurrency();
  const card = useMemo(() => {
    if (!category) return;
    return data?.data?.filter((card: any) => card.id === category)?.[0];
  }, [category]);
  const total = useMemo(() => {
    if (!card) return;
    const totalAmount = (Number(card?.rate) * amountUSD) / Number(card?.rates[currency]);
    return totalAmount;
  }, [amountUSD, currency]);
  const handleDisabled = () => !amountUSD || !card || !category;
  const handleSubmit = async () => {
    navigation.navigate('BuyGiftCardTradeSummaryPage', {
      buyGiftCard: {
        card,
        category,
        giftCard: category,
        amountUSD,
        currency,
        rate: `${currency} ${Money(Number(card?.rates[currency]) || 0, currency)}`,
        total: `${currency} ${Money(total || 0, currency)}`,
        comment,
      },
    });
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
        <FormSelect label="Select Giftcard" value={category} setValue={setCategory} data={data?.data} />
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
