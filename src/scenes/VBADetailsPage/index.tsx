import { useCheckBVNVerification, useGetVBADetails } from '@api/hooks/useBankAccounts';
import { CopyAsset } from '@assets/SVG';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { onOpenToast } from '@utils/toast';
import { HStack, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import Share from 'react-native-share';

export const copyText = (text: string) => {
  Clipboard.setString(text);
  onOpenToast({
    status: 'info',
    message: 'Text copied successfully',
  });
};

export const shareText = (message: string) => {
  Share.open({
    message,
  });
};

export default function VBADetailsPage() {
  const navigation = useNavigation();
  const { data, isFetching } = useGetVBADetails();

  const { data: bvnVerificationData, isFetching: isFetchingBVNVerification } = useCheckBVNVerification(
    !data && !isFetching,
  );

  if (isFetching || isFetchingBVNVerification) return <CLoader />;

  if (!isFetching && !data) {
    if (bvnVerificationData?.status) {
      navigation.navigate('IdentityVerifiedSuccessPage' as any);
    } else {
      navigation.navigate('VBAPage' as any);
    }
    return null;
  }

  return (
    <BackButtonTitleCenter noScroll title="Fund Wallet">
      <VStack justifyContent={'center'} alignItems={'center'} flex={1} mx="10" pb="10" space="7">
        <VStack alignItems={'center'} space={1}>
          <Text>CardVest Account Number</Text>
          <Pressable onPress={() => copyText(data.banknumber)}>
            <HStack space={2} justifyItems="center" alignItems="center">
              <Text fontSize={'3xl'}>{data.banknumber}</Text>
              <CopyAsset />
            </HStack>
          </Pressable>
          <Text>{data.bankname}</Text>
        </VStack>
        <Text textAlign={'center'} fontSize={'sm'} color="gray.400">
          Money transferred to this bank account number will automatically top up your CardVest wallet. Receive funds
          from any local bank account directly into your CardVest wallet.
        </Text>
        <HStack>
          <Pressable
            flex={1}
            onPress={() => shareText(`${data.banknumber}`)}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'#235643'}
            borderWidth={1}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="#235643">
                Share Account Details
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </VStack>
    </BackButtonTitleCenter>
  );
}
