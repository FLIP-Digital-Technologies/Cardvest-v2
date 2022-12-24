import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
// import { useNavigation } from '@react-navigation/native';
// import { GenericNavigationProps } from '@routes/types';
import { View, Center, Button, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const ChangePinPage: FC = () => {
  // const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Change PIN">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View my="6">
          <Input label="Current PIN" />
          <Input label="New PIN" />
          <Input label="Confirm PIN" />
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
            Update PIN
          </Button>
        </Center>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ChangePinPage);
