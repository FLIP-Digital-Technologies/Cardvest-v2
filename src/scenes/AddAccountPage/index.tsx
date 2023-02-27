import { useCreateBankAccount, useGetBankList, useVerifyBankAccount } from '@api/hooks/useBankAccounts';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormSelect } from '@scenes/CalculatorPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { View } from 'native-base';
import React, { FC, memo, useEffect, useState } from 'react';

const AddAccountPage: FC = () => {
  const [accountname, setAccName] = useState('');
  const [accBank, setAccBank] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data } = useGetBankList(currency);
  const { mutate: createBankAccount, isLoading } = useCreateBankAccount();
  const { mutate: verifyBankAccount, data: bankAccount, isLoading: isVerifying } = useVerifyBankAccount();

  useEffect(() => {
    async function verAcc() {
      try {
        await verifyBankAccount({ banknumber: accNumber, bankname: accBank, currency });
      } catch (err) {
        console.log(err);
      }
    }
    if (accNumber.length > 9 && accNumber.length < 11 && accBank) {
      verAcc();
    }
  }, [accNumber, accBank]);
  const handleDisabled = () =>
    !(accNumber.length > 9 && accNumber.length < 11 && accBank) ||
    !accNumber ||
    !accBank ||
    !(bankAccount?.data?.account_name && currency === 'NGN') ||
    !(accountname && currency === 'GHS');
  const handleSubmit = async () => {
    try {
      await createBankAccount({
        banknumber: accNumber,
        bankname: bankAccount?.data?.bank_name,
        currency,
        code: accBank,
        accountname: currency === 'GHS' ? accountname : bankAccount?.data?.account_name,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BackButtonTitleCenter
      title="Add Account"
      actionText="Continue"
      isLoading={isLoading || isVerifying}
      isDisabled={handleDisabled()}
      action={() => handleSubmit()}>
      <View my="7">
        <FormCurrencyPicker label="Select Wallet" setCurrency={handleSwitchCurrency} currency={currency} />
        <View p="3" />
        <Input label="Account Number" value={accNumber} onChangeText={setAccNumber} />
        <View p="3" />
        <FormSelect
          label="Select Bank"
          value={accBank}
          setValue={setAccBank}
          data={data?.data?.map((item: any) => ({
            name: item.name,
            id: item?.code,
            ...item,
          }))}
        />
        <View p="3" />
        {currency === 'NGN' ? (
          <Input label="Account Name" value={bankAccount?.data?.account_name} disabled />
        ) : (
          <Input label="Account Name" value={accountname} onChangeText={setAccName} />
        )}
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(AddAccountPage);
