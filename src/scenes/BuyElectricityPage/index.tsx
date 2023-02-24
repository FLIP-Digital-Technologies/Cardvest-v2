import {
  useElectricityPlansProviders,
  usePurchaseElectricity,
  useVerifyMeterElectricity,
} from '@api/hooks/useTransactions';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { FormSelect } from '@scenes/CalculatorPage';
import { Text, View } from 'native-base';
import React, { FC, memo, useEffect, useState } from 'react';

const BuyElectricityPage: FC = () => {
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [meter_type, setMeterType] = useState('');
  const [meter_no, setMeterNo] = useState('');
  const { currency } = useCurrency();
  const { data: proviDate } = useElectricityPlansProviders();
  const { mutate: purchaseElectricity, isLoading } = usePurchaseElectricity();
  const { mutate: verifyMeterNo, data: meter_name } = useVerifyMeterElectricity(meter_no);
  const handleSubmit = async () => {
    try {
      await purchaseElectricity({
        currency,
        product: network,
        amount,
        phone_no: phoneNumber,
        meter_no,
        meter_type,
      });
    } catch (e: any) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (meter_type && meter_no && network) {
      verifyMeterNo({
        product: network,
        meter_no,
        meter_type,
      });
    }
  }, [meter_type, meter_no, network]);
  const handleDisabled = () => !phoneNumber || !network || !amount;
  return (
    <BackButtonTitleCenter
      action={() => handleSubmit()}
      isDisabled={handleDisabled()}
      isLoading={isLoading}
      title="Buy Electricity"
      actionText="Buy Electricity">
      <View my="7">
        <FormSelect
          label="Select Provider"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product }))}
        />
        <View p="3" />
        <Input label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} />
        <View p="3" />
        <Input label="Meter Number" value={meter_no} onChangeText={setMeterNo} />
        {meter_name?.data && (
          <Text>{`${meter_name?.data?.customer_name} - ${meter_name?.data?.customer_address}`}</Text>
        )}
        <View p="3" />
        <FormSelect
          label="Select Meter Type"
          value={meter_type}
          setValue={setMeterType}
          data={[
            { name: 'Prepaid', id: 'PREPAID' },
            { name: 'Postpaid', id: 'POSTPAID' },
          ]}
        />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} onChangeText={setAmount} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyElectricityPage);
