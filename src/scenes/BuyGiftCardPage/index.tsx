/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useGetAllBuyCategories } from '@api/hooks/useGiftcards';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Money } from '@scenes/DashboardPage';
import { SelectComponent } from '@scenes/SignUpPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { HStack, Pressable, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [country, setCountry] = useState<number>();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [category] = useState<number>();
  const [comment] = useState('');
  const [amountUSD] = useState(0);
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
  const handleDisabled = () => true;
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
        <FormCurrencyPicker label="Payout Wallet" setCurrency={handleSwitchCurrency} currency={currency} />
        <SelectComponent label="What country are you buying from?" setValue={setCountry} value={country} />
        <FormCurrencyPicker label="Giftcard" setCurrency={handleSwitchCurrency} currency={currency} />
        <Input label="Recipient's Email" value={recipientEmail} onChangeText={setRecipientEmail} />

        {/* <View h={55} mt="auto" mb={5}>
          <Pressable
            flex={1}
            onPress={() => navigation.navigate('CalculateGiftcardPricePage' as any)}
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
        </View> */}

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
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardPage);
