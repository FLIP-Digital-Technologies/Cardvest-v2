import { useGetGiftcardCountries, useGetGiftcardsByCountry } from '@api/hooks/useGiftcards';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { SelectComponent } from '@scenes/SignUpPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Button, VStack } from 'native-base';
import React, { FC, memo, useState } from 'react';

const BuyGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, handleSwitchCurrency } = useCurrency();
  const [country, setCountry] = useState<string>('');
  const [giftcard, setGiftcard] = useState<any>('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const { data: countries, isFetching: isFetchingCountries } = useGetGiftcardCountries();
  const { data: giftcards, isFetching: isFetchingGiftcards } = useGetGiftcardsByCountry(country, !!country);

  const handleDisabled = () => !currency || !country || !`${giftcard}` || !recipientEmail;

  const handleSelectGiftcard = (id: any) => {
    let selected;
    giftcards.forEach((item: any) => {
      if (`${item.id}` === `${id}`) {
        selected = item;
      }
    });
    if (selected) {
      setGiftcard(selected);
    }
  };

  const handleSubmit = () =>
    navigation.navigate('CalculateGiftcardPricePage', {
      wallet: currency,
      country,
      giftcard,
      recipientEmail,
    });

  return (
    <BackButtonTitleCenter title="Buy Giftcard">
      <VStack space={5} my="5" flex={1}>
        <FormCurrencyPicker label="Payout Wallet" setCurrency={handleSwitchCurrency} currency={currency} />
        <SelectComponent
          label="What country are you buying from?"
          setValue={setCountry}
          value={country}
          loading={isFetchingCountries}
          options={countries}
        />
        <SelectComponent
          label="Giftcard"
          setValue={handleSelectGiftcard}
          value={giftcard.id}
          loading={isFetchingGiftcards}
          options={giftcards}
        />
        <Input label="Recipient's Email" value={recipientEmail} onChangeText={setRecipientEmail} />

        <Button
          onPress={handleSubmit}
          // navigation.navigate('InsufficientFundsErrorPage' as any)}
          my="3"
          size="lg"
          py="4"
          opacity={handleDisabled() ? 70 : 100}
          disabled={handleDisabled()}
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Proceed
        </Button>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyGiftCardPage);
