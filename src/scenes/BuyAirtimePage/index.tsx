import { useAirtimePlansProviders, usePurchaseAirtime } from '@api/hooks/useTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormBilSelect } from '@scenes/CalculatorPage';
import { View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyAirtimePage: FC = () => {
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currency } = useCurrency();
  const { data: proviDate } = useAirtimePlansProviders();
  const { mutate: purchaseAirtime, isLoading } = usePurchaseAirtime();
  const handleSubmit = async () => {
    try {
      await purchaseAirtime({
        currency,
        phone_no: phoneNumber,
        product: network,
        amount,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleDisabled = () => !phoneNumber || !network || !amount;
  return (
    <BackButtonTitleCenter
      action={() => handleSubmit()}
      isLoading={isLoading}
      isDisabled={handleDisabled()}
      title="Buy Airtime"
      actionText="Buy Airtime">
      <View my="7">
        <FormBilSelect
          label="Select Network"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product }))}
        />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} onChangeText={setAmount} />
        <View p="3" />
        <Input label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyAirtimePage);
