import { useMixpanel } from '@MixpanelAnalytics';
import { useGetWithdrawalsUSDTNetwork, useGetWithdrawalsUSDTRate, useInitializeWithdrawal } from '@api/hooks/useWallet';
import { DropDown, Exchange, GHS, NGN, RadioChecked, RadioUnChecked } from '@assets/SVG';
import Input from '@components/Input';
import TransactionPinModal from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormSelect } from '@scenes/CalculatorPage';
import { Box, HStack, Text, View, VStack, Select, CheckIcon, Divider, Input as NInput } from 'native-base';
import React, { FC, memo, useEffect, useMemo } from 'react';

export const FormCurrencyPicker = (props: any) => {
  const { currency, setCurrency, label } = props;
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <Select
          selectedValue={currency}
          minWidth="230"
          accessibilityLabel={`${label}`}
          placeholder={`${label}`}
          borderColor="#F7F9FB"
          _selectedItem={{
            bg: '#F7F2DD',
            endIcon: <CheckIcon size="5" />,
          }}
          height="50px"
          fontSize="md"
          onValueChange={itemValue => setCurrency(itemValue)}>
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
          <Select.Item
            label="NGN"
            value="NGN"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <NGN />
                  <Text> NGN</Text>
                </HStack>
                {currency === 'NGN' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
          <Select.Item
            label="GHS"
            value="GHS"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <GHS />
                  <Text> GHS</Text>
                </HStack>
                {currency === 'GHS' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
        </Select>
      </Box>
    </Box>
  );
};

export const CurrencyPicker = ({ currency, setCurrency }: { currency: string; setCurrency: any }) => (
  <Select
    selectedValue={currency}
    w="73px"
    px="2"
    h="33px"
    accessibilityLabel="Choose Currency"
    placeholder=""
    backgroundColor="#F7F2DD"
    fontSize="13"
    borderColor="#F7F9FB"
    _selectedItem={{
      bg: '#F7F2DD',
    }}
    dropdownIcon={
      <View w="6" h="6" pr="2">
        <DropDown />
      </View>
    }
    mt={1}
    onValueChange={itemValue => setCurrency(itemValue)}>
    <Select.Item
      isDisabled
      label="Select Wallet"
      value="non"
      _disabled={{ opacity: 1 }}
      startIcon={
        <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="md" color="CARDVESTGREEN">
            Select Wallet
          </Text>
        </HStack>
      }
    />
    <Select.Item
      label="NGN"
      value="NGN"
      startIcon={
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack w="12" mx="-3" h="7" alignItems="center">
            <NGN />
            <Text> NGN</Text>
          </HStack>
          {currency === 'NGN' ? (
            <View w="6" h="5">
              <RadioChecked />
            </View>
          ) : (
            <View w="6" h="5">
              <RadioUnChecked />
            </View>
          )}
        </HStack>
      }
    />
    <Select.Item
      label="GHS"
      value="GHS"
      startIcon={
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack w="12" mx="-3" h="7" alignItems="center">
            <GHS />
            <Text> GHS</Text>
          </HStack>
          {currency === 'GHS' ? (
            <View w="6" h="5">
              <RadioChecked />
            </View>
          ) : (
            <View w="6" h="5">
              <RadioUnChecked />
            </View>
          )}
        </HStack>
      }
    />
  </Select>
);

function round(value: string | number, decimals = 6) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const WithdrawalUSDT: FC = () => {
  const input = React.useRef(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [amount, setAmount] = React.useState<number | string>(0);
  const [amountUSD, setAmountUSD] = React.useState<number | string>(0);
  const [account, setAccount] = React.useState('');
  const [network, setNetwork] = React.useState('');
  const { mutate: withdrawFunds, isLoading } = useInitializeWithdrawal();
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data: rates } = useGetWithdrawalsUSDTRate(currency);
  const { data: networks } = useGetWithdrawalsUSDTNetwork();
  const [mixpanel, user] = useMixpanel();
  const rate = rates?.data?.[currency];
  const handleAmount = (val: string) => {
    if (val?.[val.length - 1] === '.' || Number(val) === 0) {
      setAmountUSD(0);
      return setAmount(val);
    }
    setAmount(parseFloat(val));
    // check what fiat it is and multiply amount by the fiat rate
    if (!val) {
      setAmountUSD(0);
    } else {
      if (currency === 'NGN') {
        const res = parseFloat(val) / (rates?.data ? rates?.data?.NGN : 0);
        setAmountUSD(round(res, 6));
      }
      if (currency === 'GHS') {
        const res = parseFloat(val) / (rates?.data ? rates?.data?.GHS : 0);
        setAmountUSD(round(res, 6));
      }
    }
  };
  const handleUSDTAmount = (val: string) => {
    if (val?.[val.length - 1] === '.' || Number(val) === 0) {
      setAmount(0);
      return setAmountUSD(val);
    }
    setAmountUSD(parseFloat(val));
    // check what fiat it is and multiply amount by the fiat rate
    if (!val) {
      setAmount(0);
    } else {
      if (currency === 'NGN') {
        const res = parseFloat(val) * (rates?.data ? rates?.data?.NGN : 0);
        setAmount(res);
      }
      if (currency === 'GHS') {
        const res = parseFloat(val) * (rates?.data ? rates?.data?.GHS : 0);
        setAmount(res);
      }
    }
  };
  const handleSubmit = async () => {
    try {
      mixpanel.identify(user?.id?.toString());
      mixpanel.track('Withdraw to Crypto Attempt');
      await withdrawFunds({
        amount: Number(amount),
        currency,
        type: 'crypto',
        wallet_address: account,
        network,
      });
    } catch (err) {
      console.error('withdrawal usd -', err);
    }
  };
  const handleDisabled = () =>
    amount.toString() === 'NaN' || !rate || !account || !amount || !network || account.length < 30;
  useEffect(() => {
    input?.current?.focus();
  }, []);
  return (
    <BackButtonTitleCenter
      isLoading={isLoading}
      isDisabled={handleDisabled()}
      title="Withdraw USDT"
      actionText="Proceed"
      action={() => setModalVisible(true)}>
      <TransactionPinModal {...{ handleSubmit, modalVisible, closeModalVisible: () => setModalVisible(false) }} />
      <View my="7">
        <Box position="relative" backgroundColor="#F7F9FB" borderRadius="md" justifyContent="flex-start" mb="10" mt="4">
          <VStack py="8" px="3" w="100%">
            <View>
              <Text color="CARDVESTGREY.50" fontSize="sm">
                Amount
              </Text>
            </View>
            <HStack pb="3" justifyContent={'space-between'}>
              <NInput
                w="80%"
                h="60"
                color="black"
                fontSize="3xl"
                ref={input}
                value={amount?.toString() === 'NaN' ? '' : amount?.toString()}
                onChangeText={handleAmount}
                keyboardType="decimal-pad"
                variant="unstyled"
              />
              <CurrencyPicker {...{ currency, setCurrency: handleSwitchCurrency }} />
            </HStack>
            <View position="relative">
              <Divider my="40px" backgroundColor="#909090" />
              <View h="60px" w="60px" zIndex={9} position="absolute" top="10%" left="43%" right="0%">
                <Exchange />
              </View>
            </View>
            <View>
              <Text color="CARDVESTGREY.50" fontSize="sm">
                USDT Equivalent
              </Text>
            </View>
            <HStack alignItems={'center'}>
              <Text color="black" fontSize="3xl">
                $
              </Text>
              <NInput
                w="100%"
                h="60"
                color="black"
                keyboardType="numeric"
                fontSize="3xl"
                onChangeText={handleUSDTAmount}
                value={amountUSD?.toString() === 'NaN' ? '' : amountUSD?.toString()}
                variant="unstyled"
              />
            </HStack>
          </VStack>
        </Box>
        <Input
          label="USDT Wallet Address"
          value={account}
          onChangeText={setAccount}
          hint="Wallet address must be 30 characters long."
        />
        <View p="3" />
        <FormSelect
          label="Network"
          value={network}
          setValue={setNetwork}
          data={networks?.data?.map((item: string) => ({ name: item, id: item }))}
        />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalUSDT);
