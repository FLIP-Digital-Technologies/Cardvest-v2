/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useGetAllBuyCategories } from '@api/hooks/useGiftcards';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { FormSelect } from '@scenes/CalculatorPage';
import { Money } from '@scenes/DashboardPage';
import { CountrySelect } from '@scenes/SignUpPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Divider, HStack, Hidden, Pressable, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [country, setCountry] = useState<number>();
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
    <BackButtonTitleCenter noScroll title="Buy Giftcard">
      <VStack space={5} my="5" flex={1}>
        <FormCurrencyPicker label="Payment Wallet" setCurrency={handleSwitchCurrency} currency={currency} />
        <CountrySelect label="What country are you buying from?" setValue={setCountry} value={country} />

        <FormCurrencyPicker label="Giftcard" setCurrency={handleSwitchCurrency} currency={currency} />

        <View h={55} mt="auto" mb={5}>
          <Pressable
            flex={1}
            onPress={() => navigation.navigate('ITunesGiftcardOptionsPage' as any)}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'#235643'}
            borderWidth={1}
            backgroundColor={'#235643'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                See Itunes Page
              </Text>
            </HStack>
          </Pressable>
        </View>

        <View h={55} mt="auto" mb={5}>
          <Pressable
            disabled={handleDisabled()}
            opacity={handleDisabled() ? 70 : 100}
            flex={1}
            onPress={() => navigation.navigate('InsufficientFundsErrorPage' as any)}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'#235643'}
            borderWidth={1}
            backgroundColor={'#235643'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                Proceed
              </Text>
            </HStack>
          </Pressable>
        </View>
      </VStack>
      <Hidden>
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
      </Hidden>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardPage);
