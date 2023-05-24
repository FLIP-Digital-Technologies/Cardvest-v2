// import TextArea from '@components/TextArea';
import { useDeleteUser } from '@api/hooks/useUser';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { cacheService } from '@utils/cache';
import { Text, View, Button, Pressable, VStack, Center } from 'native-base';
import React, { FC, memo, useState } from 'react';

const DeleteAccountFeedbackPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [password, setPassword] = useState('');
  const { mutate: deleteAccount, isLoading } = useDeleteUser();
  const handleDisabled = () => !password;
  const handleSubmit = async () => {
    try {
      const token = await cacheService.get('login-user');
      await deleteAccount({
        password,
        token,
      });
    } catch (e: any) {
      console.error('delete account', e);
    }
  };
  return (
    <BackButtonTitleCenter title="Delete Account" noScroll>
      <View my="7" alignItems="center" h="3/4" justifyContent="center">
        <VStack w="90%">
          <Center mt="16">
            <Text fontSize="xl" textAlign="center">
              Are you sure you want to delete your CardVest account?
            </Text>
            <Text mt="2" fontWeight="200" textAlign="center">
              Note: This cannot be undone
            </Text>
          </Center>
          <View marginTop="6">
            <Input type="password" label="Password" value={password} onChangeText={setPassword} />
          </View>
          <View my="8">
            <Button
              onPress={() => handleSubmit()}
              isDisabled={handleDisabled()}
              isLoading={isLoading}
              isLoadingText="Deleting Account"
              my="3"
              width="100%"
              size="lg"
              p="4"
              fontSize="md"
              backgroundColor="#FF303C"
              color="white">
              Delete Account
            </Button>
            <Pressable mt="2" onPress={() => navigation.goBack()}>
              <Text color="CARDVESTGREEN" underline textAlign="center" fontSize="sm" fontWeight="light">
                Go Back
              </Text>
            </Pressable>
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(DeleteAccountFeedbackPage);
