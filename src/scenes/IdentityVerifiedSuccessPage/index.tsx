import { useCreateVBA } from '@api/hooks/useBankAccounts';
import { IdVerifiedAsset } from '@assets/SVG';
import { useNavigation } from '@react-navigation/native';
import { onOpenToast } from '@utils/toast';
import { Button, HStack, Text, VStack, View } from 'native-base';
import React from 'react';

export default function IdentityVerifiedSuccessPage() {
  const navigation = useNavigation();
  const { mutate: createVBA, isLoading } = useCreateVBA();

  const handleCreateVBA = async () => {
    try {
      await createVBA();
    } catch (e) {
      onOpenToast({
        status: 'error',
        message: `Error while creating Virtual Bank Account: ${e}`,
      });
    }
  };

  return (
    <VStack justifyContent={'center'} alignItems={'center'} flex={1} space={3}>
      <IdVerifiedAsset />
      <Text fontSize="2xl" color="">
        Identity Verified!
      </Text>
      <Text color={'gray.400'}>Your identity has been verified successfully!</Text>
      <View mx="5" pt="5" flexDirection="row">
        <Button
          onPress={handleCreateVBA}
          isLoading={isLoading}
          isLoadingText="Verifying"
          size="lg"
          py="4"
          flex={1}
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Request Virtual Account
        </Button>
      </View>
      <View>
        <HStack space={1} justifyContent={'center'}>
          <Button variant="link" onPress={() => navigation.navigate('Home' as any)}>
            <HStack space={1}>
              <Text textAlign="center" color={'#235643'} borderBottomWidth={1} borderColor={'#235643'}>
                Go to Dashboard
              </Text>
            </HStack>
          </Button>
        </HStack>
      </View>
    </VStack>
  );
}
