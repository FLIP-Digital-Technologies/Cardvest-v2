import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
// import { useNavigation } from '@react-navigation/native';
// import { GenericNavigationProps } from '@routes/types';
import { View, Center, Button, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const PasswordPage: FC = () => {
  // const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Password">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View my="6">
          <Input label="Current Password" />
          <Input label="New Password" />
          <Input label="Confirm Password" />
        </View>
        <Center py="4">
          <Button
            // onPress={() => {}}
            my="3"
            width="100%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Update Password
          </Button>
        </Center>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(PasswordPage);
