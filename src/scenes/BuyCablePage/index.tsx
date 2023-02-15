import {
  useCablePlansProviders,
  useGetCablePlans,
  useGetDataPlans,
  usePurchaseCable,
  usePurchaseData,
} from '@api/hooks/useTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormSelect } from '@scenes/CalculatorPage';
import { View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyCablePage: FC = () => {
  const [network, setNetwork] = useState('');
  const [bundle, setBundle] = useState('');
  const [smart_card_no, setSmartCardNo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { currency } = useCurrency();
  const { data: proviDate } = useCablePlansProviders();
  const { data } = useGetCablePlans(network);
  const { mutate: purchaseCable, isLoading } = usePurchaseCable();
  const amount = useMemo(() => {
    if (!bundle) return 0;
    return data?.data?.categories?.filter((item: any) => item.code === bundle)?.[0]?.amount;
  }, [bundle]);
  const handleSubmit = async () => {
    try {
      await purchaseCable({
        currency,
        phone_no: phoneNumber,
        product: network,
        code: bundle,
        amount,
        smart_card_no,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleDisabled = () => !phoneNumber || !bundle || !network || !amount;
  console.log(proviDate, data);
  return (
    <BackButtonTitleCenter
      action={() => handleSubmit()}
      isDisabled={handleDisabled()}
      isLoading={isLoading}
      title="Cable"
      actionText="Pay">
      <View my="7">
        <FormSelect
          label="Select Provider"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product }))}
        />
        <View p="3" />
        <FormSelect
          label="Select Package"
          value={bundle}
          setValue={setBundle}
          data={data?.data?.categories?.map((item: any) => ({ ...item, id: item?.code }))}
        />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} disabled />
        <View p="3" />
        <Input label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <View p="3" />
        <Input label="Smart Card Number" value={smart_card_no} onChangeText={setSmartCardNo} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyCablePage);
