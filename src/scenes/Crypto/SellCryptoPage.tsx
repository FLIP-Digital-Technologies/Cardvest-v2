import { useMixpanel } from '@MixpanelAnalytics';
import { Coin } from '@api/crypto/types';
import { useCreateCryptoTransaction, useGetAvailableCrypto } from '@api/hooks/useCryptoTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { SelectComponent } from '@scenes/SignUpPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { formatCurrency, getCurrencySymbol, toMoney } from '@utils/functions';
import { onOpenToast } from '@utils/toast';
import { Box, Button, HStack, Modal, Pressable, Text, VStack, View } from 'native-base';
import React, { useEffect } from 'react';
import { FC, memo, useState } from 'react';
import { Alert } from 'react-native';

const SellCryptoPage: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [showRates, setShowRates] = useState(false);

  // Form values
  const { currency, handleSwitchCurrency } = useCurrency();
  const [selectedCoin, setSelectedCoin] = useState('');
  const [amount, setAmount] = useState<number>();
  const [amountUSD, setAmountUSD] = useState<number>();
  const [amountInLocalCurrency, setAmountInLocalCurrency] = useState<number>();

  const isInputDisabled = !selectedCoin || !currency;

  const { data: availableCoins } = useGetAvailableCrypto({ currency: 'NGN' });
  const [selectedCoinData, setSelectedCoinData] = useState<Coin>();
  const [minUSDAmount, setMinUSDAmount] = useState<number>();
  const [maxUSDAmount, setMaxUSDAmount] = useState<number>();

  const { mutate: sellCryptoAction, isLoading } = useCreateCryptoTransaction();
  const [mixpanel, user] = useMixpanel();

  const handleSubmit = async () => {
    return navigation.navigate('SellCryptoPaymentPage');
    if (!amount || !selectedCoin || !currency) {
      onOpenToast({
        status: 'error',
        message: 'Please fill all necessary inputs',
      });
      return;
    }

    try {
      mixpanel.identify(user?.id?.toString());
      mixpanel.track('Sell GiftCard Attempt');
      await sellCryptoAction({
        amount: amount,
        coin: selectedCoin,
        currency: currency,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const clearInput = (from: 'amount' | 'usd-amount') => {
    if (from === 'amount') {
      setAmountUSD(undefined);
      setAmountInLocalCurrency(undefined);
    } else {
      setAmount(undefined);
      setAmountInLocalCurrency(undefined);
    }
  };

  const calculateLocalAmountFromAmount = (amountValue: number) => {
    if (!selectedCoin || !currency) return;

    if (!selectedCoinData) return;

    const usdRate = parseFloat(selectedCoinData.rate);
    const usdEquivalent = amountValue * usdRate;

    // selecting the appropriate rule
    const rule = selectedCoinData.rules.find(
      r => usdEquivalent >= parseFloat(r.min) && usdEquivalent <= parseFloat(r.max),
    );

    if (!rule) return clearInput('amount');
    const localRate = rule.rates[currency as 'NGN' | 'GHS'];

    if (amountValue) {
      setAmountUSD(usdEquivalent);
      setAmountInLocalCurrency(usdEquivalent * localRate);
    } else clearInput('amount');
  };

  const calculateLocalAmountFromUSDAmount = (amountUSDValue: number) => {
    if (!selectedCoin || !amountUSD) return;

    if (!selectedCoinData) return;

    const usdRate = parseFloat(selectedCoinData.rate);

    // selecting the appropriate rule
    const rule = selectedCoinData.rules.find(
      r => amountUSDValue >= parseFloat(r.min) && amountUSDValue <= parseFloat(r.max),
    );

    if (!rule) return clearInput('usd-amount');
    const localRate = rule.rates[currency as 'NGN' | 'GHS'];

    if (amountUSDValue) {
      setAmount(amountUSDValue / usdRate);
      setAmountInLocalCurrency(amountUSDValue * localRate);
    } else clearInput('usd-amount');
  };

  useEffect(() => {
    const coin = availableCoins?.find(c => c.name === selectedCoin);
    if (coin) setSelectedCoinData(coin);
  }, [availableCoins, selectedCoin]);

  useEffect(() => {
    clearInput('amount');
    clearInput('usd-amount');
  }, [currency, selectedCoin]);

  return (
    <BackButtonTitleCenter title="Sell Crypto" actionText="Proceed" isDisabled={false} action={() => handleSubmit()}>
      <View my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>

        <View p="3" />
        <FormCurrencyPicker label="Payout Wallet" setCurrency={handleSwitchCurrency} currency={currency} />

        <View p="3" />
        <SelectComponent
          label="Select Coin"
          placeholder="Select"
          setValue={setSelectedCoin}
          value={selectedCoin}
          // loading={isFetchingGiftcards}
          // isDisabled={!country}
          options={availableCoins}
        />
        {selectedCoin && (
          <Pressable onPress={() => setShowRates(true)}>
            <Text fontSize={'md'} color={'CARDVESTGREEN'} underline fontStyle={'italic'}>
              Check {selectedCoin} Rates
            </Text>
          </Pressable>
        )}

        <View p="3" />
        <Input
          label="Amount"
          placeholder="Enter Amount"
          keyboardType="decimal-pad"
          onChangeText={value => {
            setAmount(value);
            calculateLocalAmountFromAmount(value);
          }}
          value={`${amount ?? ''}`}
          disabled={isInputDisabled}
        />

        <View p="3" />
        <Input
          label="USD Equivalent"
          keyboardType="decimal-pad"
          placeholder="USD Equivalent"
          onChangeText={value => {
            setAmountUSD(value);
            calculateLocalAmountFromUSDAmount(value);
          }}
          value={`${amountUSD ?? ''}`}
          disabled={isInputDisabled}
        />

        <View p="3" />
        <Box>
          <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
            You Receive
          </Text>
          <Box backgroundColor="#F7F9FB" borderRadius={'8px'} py="4" px="3">
            <Text fontSize={'md'} fontWeight={amountInLocalCurrency ? 'bold' : 'light'}>
              {amountInLocalCurrency ? toMoney(amountInLocalCurrency, currency) : 'Amount in preferred currency'}
            </Text>
          </Box>
        </Box>
      </View>

      <Modal isOpen={showRates} onClose={() => setShowRates(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Crypto Rates</Modal.Header>
          <Modal.Body>
            <HStack justifyContent={'space-between'} mt={4}>
              <Text fontWeight={'bold'} pl={'4'}>
                1 {selectedCoinData?.name}
              </Text>
              <Text pr={'4'}>{selectedCoinData ? toMoney(Number(selectedCoinData?.rate), 'USD') : '-'}</Text>
            </HStack>

            <VStack mt={8} mb={8} borderWidth={'1'} borderRadius={'lg'}>
              <HStack justifyContent={'space-between'} mt={4} borderBottomWidth={'1'} pb={'2'}>
                <Text fontWeight={'bold'} pl={'2'}>
                  USD
                </Text>
                <Text fontWeight={'bold'} pr={'2'}>
                  Local Currency
                </Text>
              </HStack>
              {selectedCoinData?.rules.map((rule, index) => (
                <HStack
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  px={'2'}
                  py={'1'}
                  borderBottomWidth={index === selectedCoinData.rules.length - 1 ? '0' : '1'}>
                  <Text fontWeight={'bold'}>
                    {rule.min} - {rule.max}
                  </Text>
                  <VStack>
                    <Text textAlign={'right'}>
                      {getCurrencySymbol(currency)} {formatCurrency(rule.rates[currency as 'NGN' | 'GHS'])}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </BackButtonTitleCenter>
  );
};

export default memo(SellCryptoPage);
