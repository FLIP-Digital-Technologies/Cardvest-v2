import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const BuyDatePage: FC = () => {
  return (
    <BackButtonTitleCenter title="Buy Data" actionText="Buy Data">
      <View my="7">
        <Input label="Select Network" />
        <View p="3" />
        <Input label="Available Bundles" />
        <View p="3" />
        <Input label="Amount" />
        <View p="3" />
        <Input label="Mobile Number" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyDatePage);
