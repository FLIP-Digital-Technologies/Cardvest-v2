import { Copy, ReferralHock } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Center, Button, ScrollView, Text, VStack, Pressable } from 'native-base';
import React, { FC, memo } from 'react';

const ReferralPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const copyToClipboard: (link: string) => void = link => {
    Clipboard.setString(link);
  };
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
            <Text mt="4" mb="2" color="CARDVESTBLACK.50" fontSize="lg" fontWeight="bold">
              Refer & Earn
            </Text>
            <Text color="CARDVESTGREY.50" fontSize="md" fontWeight="light">
              Invite your friends & family and receive a bonus when they initiate their first trade.
            </Text>
          </View>
          <View marginTop="6">
            <Input
              label=""
              value="https://app.cardvest.ng/register?fe8893la/a"
              InputRightElement={
                <Pressable
                  onPress={() => copyToClipboard('https://app.cardvest.ng/register?fe8893la/a')}
                  width="10"
                  h="5">
                  <Copy />
                </Pressable>
              }
            />
          </View>
          <VStack pt="10" pb="4">
            <Text mt="4" mb="2" color="CARDVESTBLACK.50" fontSize="lg" fontWeight="bold">
              Your Referrals
            </Text>
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
              onPress={() => copyToClipboard('https://app.cardvest.ng/register?fe8893la/a')}
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
