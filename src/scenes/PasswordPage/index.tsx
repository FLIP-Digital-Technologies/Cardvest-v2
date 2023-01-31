import { useModifyUserPassword } from '@api/hooks/useUser';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';
// import { useNavigation } from '@react-navigation/native';
// import { GenericNavigationProps } from '@routes/types';
import { View, Center, Button, ScrollView } from 'native-base';
import React, { FC, memo, useState } from 'react';

const PasswordPage: FC = () => {
  const { mutate: updatePassword, isLoading } = useModifyUserPassword();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['user']);
  const [current_password, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmationPassword] = useState('');

  const handleSubmit = () => {
    if (password_confirmation === password) {
      return updatePassword({
        current_password,
        password,
        password_confirmation,
        userId: data.id,
      });
    }
    onOpenToast({
      status: 'error',
      message: 'Passwords are not the same.',
    });
  };
  const handleDisabled = () =>
    !password_confirmation || !password || !current_password || password !== password_confirmation;
  return (
    <BackButtonTitleCenter title="Password">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <View my="6">
          <Input label="Current Password" type="password" onChangeText={setCurrentPassword} />
          <Input label="New Password" type="password" onChangeText={setPassword} />
          <Input label="Confirm Password" type="password" onChangeText={setConfirmationPassword} />
        </View>
        <Center py="4">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            isLoading={isLoading}
            isLoadingText="Updating Password"
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
