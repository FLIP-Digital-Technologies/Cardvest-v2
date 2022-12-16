import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const BuyCablePage: FC = () => {
  return (
    <BackButtonTitleCenter title="Cable" actionText="Pay">
      <View my="7">
        <Input label="Select Provider" />
        <View p="3" />
        <Input label="Select Package" />
        <View p="3" />
        <Input label="Amount" />
        <View p="3" />
        <Input label="Smart Card Number" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BuyCablePage);
