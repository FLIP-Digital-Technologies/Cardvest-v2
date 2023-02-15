import { useGetUserBank } from '@api/hooks/useBankAccounts';
import { useInitializeWithdrawal } from '@api/hooks/useWallet';
import { AddGreen } from '@assets/SVG';
import Input from '@components/Input';
import TransactionPinModal from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { FormSelect } from '@scenes/CalculatorPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Button, Divider, HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { FC, memo, useState } from 'react';

const WithdrawalPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data } = useGetUserBank(currency);
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState('');
  const { mutate: withdrawFunds, isLoading } = useInitializeWithdrawal();
  const handleSubmit = async () => {
    try {
      await withdrawFunds({
        amount,
        bank: account,
        currency,
        type: 'fiat',
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDisabled = () => !account || !amount;
  return (
    <BackButtonTitleCenter title="Withdraw Funds">
      <TransactionPinModal {...{ handleSubmit, modalVisible, closeModalVisible: () => setModalVisible(false) }} />
      <View my="7">
        <FormCurrencyPicker label="Select Wallet" setCurrency={handleSwitchCurrency} currency={currency} />
        <View p="3" />
        <Input label="Amount" value={amount} onChangeText={setAmount} />
        <View p="3" />
        <FormSelect
          label="Select Withdrawal Account"
          value={account}
          setValue={setAccount}
          data={data?.data?.map((i: any) => ({
            ...i,
            name: `${i.accountname} - ${i.bankname} ${i.banknumber}`,
          }))}
        />
        <View p="3" />
        <Pressable onPress={() => navigation.navigate('AddAccount')}>
          <HStack alignItems="center" justifyContent="center">
            <View w="6" h="6">
              <AddGreen />
            </View>
            <Text mx="2" color="CARDVESTGREEN">
              Add new account
            </Text>
          </HStack>
        </Pressable>
        <View p="3" />
        <VStack>
          <Button
            onPress={() => setModalVisible(true)}
            isDisabled={handleDisabled()}
            isLoading={isLoading}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Withdraw Funds
          </Button>
          <View position="relative">
            <Divider my="60px" backgroundColor="#909090" />
            <View backgroundColor="#fff" w="6" zIndex={9} position="absolute" top="40%" left="45%" right="0%">
              <Text m="auto">OR</Text>
            </View>
          </View>
          <Button
            onPress={() => navigation.navigate('WithdrawalUSDT')}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="SUN_FLOWER"
            color="black">
            <Text px="1" fontSize="lg" color="black">
              Withdraw USDT
            </Text>
          </Button>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalPage);
