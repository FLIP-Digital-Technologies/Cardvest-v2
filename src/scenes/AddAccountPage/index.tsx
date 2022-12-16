import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const AddAccountPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Add Account"
      actionText="Continue"
      action={() => navigation.navigate('AddAccountFeedback')}>
      <View my="7">
        <Input label="Account Number" />
        <View p="3" />
        <Input label="Select Bank" />
        <View p="3" />
        <Input label="Account Name" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(AddAccountPage);
