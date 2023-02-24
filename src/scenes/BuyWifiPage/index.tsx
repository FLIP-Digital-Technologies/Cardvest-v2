import { useGetWifiPlans, usePurchaseWifi, useWifiPlansProviders } from '@api/hooks/useTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormSelect } from '@scenes/CalculatorPage';
import { View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const BuyWifiPage: FC = () => {
  const [network, setNetwork] = useState('');
  const [bundle, setBundle] = useState('');
  const [device_no, setDeviceNo] = useState('');
  const { currency } = useCurrency();
  const { data: proviDate } = useWifiPlansProviders();
  const { data } = useGetWifiPlans(network);
  const { mutate: purchaseWifi, isLoading } = usePurchaseWifi();
  const amount = useMemo(() => {
    if (!bundle) return 0;
    return data?.data?.categories?.filter((item: any) => item.code === bundle)?.[0]?.amount;
  }, [bundle]);
  const handleSubmit = async () => {
    try {
      await purchaseWifi({
        currency,
        product: network,
        code: bundle,
        amount,
        device_no,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  const handleDisabled = () => !device_no || !bundle || !network || !amount;
  return (
    <BackButtonTitleCenter
      action={() => handleSubmit()}
      isDisabled={handleDisabled()}
      isLoading={isLoading}
      title="Buy Wifi"
      actionText="Buy Wifi">
      <View my="7">
        <FormSelect
          label="Select Provider"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product.toLowerCase() }))}
        />
        <View p="3" />
        <FormSelect
          label="Select Package"
          value={bundle}
          setValue={setBundle}
          data={data?.data?.categories?.map((item: any) => ({ ...item, id: item?.code }))}
        />
        <View p="3" />
        <Input label="Device Number" value={device_no} onChangeText={setDeviceNo} />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} disabled />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyWifiPage);
