import { useCreateBuyTransaction } from '@api/hooks/useGiftcards';
import { RadioChecked, RadioUnChecked } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { Money } from '@scenes/DashboardPage';
import { onOpenToast } from '@utils/toast';
import {
  Box,
  Button,
  CheckIcon,
  Checkbox,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  IconButton,
  Input,
  Select,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { FC, memo, useState } from 'react';

const CalculateGiftcardPricePage: FC = ({ route, navigation }: any) => {
  const { mutate: createBuyTransaction, isLoading } = useCreateBuyTransaction();

  const { currency, currencyWallet } = useCurrency();

  const params = route.params;

  // const giftcardData = {
  //   brand: { brandId: 320, brandName: 'Binance' },
  //   country: { flagUrl: 'https://s3.amazonaws.com/rld-flags/ng.svg', isoName: 'NG', name: 'Nigeria' },
  //   denominations: [50, 100],
  //   id: 16192,
  //   label: 'Binance NG',
  //   logo_url: 'https://cdn.reloadly.com/giftcards/e9333314-918b-4339-b495-854b7f714376.png',
  //   name: 'Binance NG',
  //   rate: 800,
  //   rates: { NGN: 1 },
  //   redeemInstruction: 'To redeem, visit https://www.binance.com/en/gift-card',
  //   terms:
  //     "To redeem, visit https://www.binance.com/en/gift-card or Download the Binance App from https://binance.com/en/download. Create an account, then tap the 'Profile Icon' on top left corner, tap Gift Card: tap Receive, tap Redeem Crypto, enter Gift Card code (16-digit alphanumeric sequence. For more questions, please see Gift Cards FAQ",
  //   value: 16192,
  // };

  if (!params?.wallet || !params?.country || !params?.giftcard || !params?.recipientEmail) {
    navigation.navigate('BuyGiftCard');
  }

  const [cardUnit, setCardUnit] = useState(params.giftcard.denominations[0]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(cardUnit * params.giftcard.rate * quantity);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const addQty = () => {
    setQuantity(prev => {
      const newQty = prev + 1;
      setTotal(cardUnit * params.giftcard.rate * newQty);
      return newQty;
    });
  };
  const reduceQty = () => {
    setQuantity(prev => {
      if (prev === 1) return 1;
      const newQty = prev - 1;
      setTotal(cardUnit * params.giftcard.rate * newQty);
      return newQty;
    });
  };
  const handleSetCardUnit = (newCardUnit: number) => {
    setTotal(newCardUnit * params.giftcard.rate * quantity);
    setCardUnit(newCardUnit);
  };

  const handleSubmit = async () => {
    const balance = currencyWallet?.balance || 0;
    if (balance >= total) {
      try {
        const payload = {
          card_id: params.giftcard?.id,
          card_name: params.giftcard?.name,
          card_unit: parseFloat(cardUnit),
          quantity,
          amount: total,
          currency,
          country_code: params.giftcard?.country.isoName,
          email: params?.recipientEmail,
        };
        await createBuyTransaction(payload);
      } catch (e) {
        onOpenToast({
          status: 'error',
          message: `Error while creating transaction: ${e}`,
        });
      }
    } else {
      navigation.navigate('InsufficientFundsErrorPage');
    }
  };

  return (
    <BackButtonTitleCenter noScroll title={params.giftcard.name}>
      {/* <Text color="CARDVESTGREY.100" textAlign={'center'} w="85%" mx="auto">
        Go to apple.com/redeem to add to your Apple Account balance
      </Text> */}
      <VStack space={5} my="5" flex={1}>
        <View borderRadius={15} p="5" backgroundColor={'gray.100'}>
          <VStack space={5}>
            <VStack space={3} pb={3} borderBottomColor={'CARDVESTGREEN'} borderBottomWidth={1} borderStyle={'dashed'}>
              <HStack alignItems={'center'} space={3}>
                <Text color="CARDVESTGREEN" flex={1}>
                  Card Unit:
                </Text>
                <Box flex={1}>
                  <Select
                    backgroundColor="white"
                    selectedValue={cardUnit}
                    accessibilityLabel="Choose Card Unit"
                    _selectedItem={{
                      bg: '#F7F2DD',
                      endIcon: <CheckIcon size="1" />,
                    }}
                    mt={1}
                    onValueChange={itemValue => handleSetCardUnit(parseFloat(itemValue))}
                    dropdownIcon={
                      <View pr="2">
                        <ChevronDownIcon />
                      </View>
                    }>
                    {params.giftcard.denominations.map((item: any) => (
                      <Select.Item
                        label={`${item}`}
                        value={item}
                        startIcon={
                          <View w="6" h="5">
                            {item === cardUnit ? <RadioChecked /> : <RadioUnChecked />}
                          </View>
                        }
                      />
                    ))}
                  </Select>
                </Box>
                <View flex={1} />
              </HStack>
              <HStack alignItems={'center'} space={3}>
                <Text color="CARDVESTGREEN" flex={1}>
                  Quantity:
                </Text>
                <Input backgroundColor={'white'} value={`${quantity}`} flex={1} />
                <HStack flex={1} space={3}>
                  <IconButton
                    variant="solid"
                    size={'sm'}
                    backgroundColor={'CARDVESTGREEN'}
                    color="white"
                    borderRadius={'full'}
                    icon={<ChevronUpIcon color="white" />}
                    onPress={addQty}
                  />
                  <IconButton
                    variant="solid"
                    size={'sm'}
                    backgroundColor={'CARDVESTGREEN'}
                    color="white"
                    borderRadius={'full'}
                    icon={<ChevronDownIcon color="white" />}
                    onPress={reduceQty}
                  />
                </HStack>
              </HStack>
            </VStack>
            <HStack alignItems={'center'} space={3}>
              <Text color="CARDVESTGREEN" flex={1}>
                Total Price:
              </Text>
              <Text color="CARDVESTGREEN" flex={2}>
                {currency + Money(total, currency)}
              </Text>
            </HStack>
          </VStack>
        </View>
        <HStack space={3}>
          <Checkbox
            colorScheme={'green'}
            value="test"
            accessibilityLabel="Checkbox for agreeing to terms and conditions"
            isChecked={agreeToTerms}
            onChange={setAgreeToTerms}
          />
          <Text color="CARDVESTGREEN">Agree to Terms and Conditions</Text>
        </HStack>

        <Button
          isLoading={isLoading}
          isLoadingText="Processing"
          isDisabled={!agreeToTerms}
          onPress={handleSubmit}
          mt="auto"
          size="lg"
          py="4"
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Proceed to payment
        </Button>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(CalculateGiftcardPricePage);
