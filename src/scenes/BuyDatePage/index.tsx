import { useGetDataPlans, usePurchaseData, useGetDataPlansProviders } from '@api/hooks/useTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormBilSelect, FormSelect } from '@scenes/CalculatorPage';
import { View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyDatePage: FC = () => {
  const [network, setNetwork] = useState('');
  const [bundle, setBundle] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currency } = useCurrency();
  const { data: proviDate } = useGetDataPlansProviders();
  const { data } = useGetDataPlans(network);
  const { mutate: purchseDate, isLoading } = usePurchaseData();
  const amount = useMemo(() => {
    if (!bundle) return 0;
    return data?.data?.categories?.filter((item: any) => item.code === bundle)?.[0]?.amount;
  }, [bundle]);
  const handleSubmit = async () => {
    try {
      await purchseDate({
        currency,
        phone_no: phoneNumber,
        product: network,
        code: bundle,
        amount,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleDisabled = () => !phoneNumber || !bundle || !network || !amount;
  return (
    <BackButtonTitleCenter
      isDisabled={handleDisabled()}
      title="Buy Data"
      actionText="Buy Data"
      isLoading={isLoading}
      action={() => handleSubmit()}>
      <View my="7">
        <FormBilSelect
          label="Select Network"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product }))}
        />
        <View p="3" />
        <FormSelect
          label="Available Bundles"
          value={bundle}
          setValue={setBundle}
          data={data?.data?.categories?.map((item: any) => ({ ...item, id: item?.code }))}
        />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} disabled />
        <View p="3" />
        <Input label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyDatePage);
