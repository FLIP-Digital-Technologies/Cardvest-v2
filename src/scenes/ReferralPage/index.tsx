import { useGetReferralUserCode, useGetReferredUsers } from '@api/hooks/useReferrals';
import { Copy, ReferralHock } from '@assets/SVG';
import CLoader from '@components/CLoader';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import Clipboard from '@react-native-clipboard/clipboard';
import { BoldText } from '@scenes/LoginPage';
import { onOpenToast } from '@utils/toast';
import { View, Button, ScrollView, Text, VStack, Pressable } from 'native-base';
import React, { FC, memo } from 'react';

const ReferralPage: FC = () => {
  const { data } = useGetReferredUsers();
  const { data: ref, isFetching } = useGetReferralUserCode();
  const copyToClipboard: (link: string) => void = link => {
    Clipboard.setString(link);
    onOpenToast({
      status: 'info',
      message: 'Copied to clipboard',
    });
  };
  console.log(data?.data, ref?.data);
  if (isFetching) return <CLoader />;
  return (
    <BackButtonTitleCenter title="Referrals">
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <VStack mt="8">
          <View>
            <BoldText mt="4" mb="2" color="CARDVESTBLACK.50" fontSize="lg">
              Refer & Earn
            </BoldText>
            <Text color="CARDVESTGREY.50" fontSize="md" fontWeight="light">
              Invite your friends & family and receive a bonus when they initiate their first trade.
            </Text>
          </View>
          <View marginTop="6">
            <Input
              label=""
              disabled
              value={ref?.data?.link}
              InputRightElement={
                <Pressable onPress={() => copyToClipboard(ref?.data?.link)} width="10" h="5">
                  <Copy />
                </Pressable>
              }
            />
          </View>
          <VStack pt="10" pb="4">
            <BoldText mt="4" mb="2" color="CARDVESTBLACK.50" fontSize="lg">
              Your Referrals
            </BoldText>
            <VStack alignItems="center" my="5">
              <View h="90" w="90" mx="10" mb="6" mt="2">
                <ReferralHock />
              </View>
              <Text fontSize="lg" color="CARDVESTBLACK.50">
                Wanna Earn Cool Cash?
              </Text>
              <Text fontSize="sm" w="70%" textAlign="center" fontWeight="light" color="CARDVESTGREY.400">
                Share your referral link to invite friends and family
              </Text>
            </VStack>
            <Button
              onPress={() => copyToClipboard(ref?.data?.link)}
              my="3"
              width="100%"
              size="lg"
              p="4"
              fontSize="md"
              backgroundColor="CARDVESTGREEN"
              color="white">
              Copy Referral Link
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </BackButtonTitleCenter>
  );
};

export default memo(ReferralPage);
