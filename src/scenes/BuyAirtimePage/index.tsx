import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const BuyAirtimePage: FC = () => {
  return (
    <BackButtonTitleCenter title="Buy Airtime" actionText="Buy Airtime">
      <View my="7">
        <Input label="Select Network" />
        <View p="3" />
        <Input label="Amount" />
        <View p="3" />
        <Input label="Mobile Number" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyAirtimePage);
