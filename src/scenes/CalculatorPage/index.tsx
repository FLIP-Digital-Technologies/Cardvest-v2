/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { useGetAllCategories, useGetGiftcardsToSell } from '@api/hooks/useGiftcards';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Money } from '@scenes/DashboardPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Box, HStack, Text, View, VStack, Select, CheckIcon, Divider } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

export const FormSelect = (props: any) => {
  const { value, setValue, label, data } = props;
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <Select
          selectedValue={value}
          minWidth="200"
          accessibilityLabel={`${label}`}
          placeholder={`${label}`}
          borderColor="#F7F9FB"
          _selectedItem={{
            bg: '#F7F2DD',
            endIcon: <CheckIcon size="5" />,
          }}
          height="51.3px"
          fontSize="md"
          onValueChange={(itemValue: string) => setValue(itemValue)}>
          <Select.Item
            isDisabled
            label={`${label}`}
            value="non"
            _disabled={{ opacity: 1 }}
            startIcon={
              <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="CARDVESTGREEN">
                  {label}
                </Text>
              </HStack>
            }
          />
          {data?.map((item: any) => (
            <Select.Item key={item?.id} label={item?.name} value={item?.id} />
          ))}
        </Select>
      </Box>
    </Box>
  );
};

const Calculator: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [category, setCategory] = useState<number>();
  const [giftCard, setGiftCard] = useState('');
  const [amountUSD, setAmountUSD] = useState(0);
  const { data } = useGetAllCategories();
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data: giftCardsData } = useGetGiftcardsToSell({ category_id: Number(category) });
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
  return (
    <BackButtonTitleCenter
      title="Calculator"
      actionText="Proceed to Trade"
      isDisabled={handleDisabled()}
      action={() =>
        navigation.navigate('SellGiftCard', {
          tradeData: {
            category,
            giftCard,
            amountUSD,
          },
        })
      }>
      <View mt="7" mb="5">
        <FormSelect label="Select Category" value={category} setValue={setCategory} data={data?.data} />
        <View p="3" />
        <FormSelect label="Select Giftcard" value={giftCard} setValue={setGiftCard} data={giftCardsData?.data} />
        <View p="3" />
        <Input label="Amount in USD" value={amountUSD} onChangeText={setAmountUSD} />
        <View p="3" />
        <FormCurrencyPicker label="Payout Currency" setCurrency={handleSwitchCurrency} currency={currency} />
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
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(Calculator);
