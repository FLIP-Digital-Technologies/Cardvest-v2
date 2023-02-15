import { Connect, Rate, Refer, RightAngle, Suggestion } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Divider, HStack, Text, View, VStack, Link } from 'native-base';
import React, { FC, memo } from 'react';
import { Linking, Platform, Pressable } from 'react-native';

const KYCPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Show some love">
      <VStack my="7">
        <Link
          isExternal
          href={
            Platform.OS === 'ios'
              ? 'https://itunes.apple.com/app/id1598288580?action=write-review'
              : 'https://play.google.com/store/apps/details?id=com.flipdigitals.cardvest'
          }>
          <HStack py="4" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" alignItems="center">
              <View width="5" h="8">
                <Rate />
              </View>
              <Text fontWeight="light" px="4">
                Rate Us
              </Text>
            </HStack>
          </HStack>
          <Divider bg="#F7F9FB" />
        </Link>
        <Link
          isExternal
          href={
            'mailto:support@cardvest.ng?subject=Please%20suggest%20feedback%20for%20cardvest&body=Thank%20you%20for%20taking%20your%20time%20to%20make%20suggestion%20to%20our%20product.'
          }>
          <HStack py="4" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" alignItems="center">
              <View width="5" h="8">
                <Suggestion />
              </View>
              <Text fontWeight="light" px="4">
                Suggestion Box
              </Text>
            </HStack>
          </HStack>
          <Divider bg="#F7F9FB" />
        </Link>
        <Pressable onPress={() => navigation.navigate('Referrals')}>
          <HStack py="4" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" alignItems="center">
              <View width="5" h="8">
                <Refer />
              </View>
              <Text fontWeight="light" px="4">
                Refer Friends
              </Text>
            </HStack>
          </HStack>
          <Divider bg="#F7F9FB" />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Referrals')}>
          <HStack py="4" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" alignItems="center">
              <View width="5" h="8">
                <Connect />
              </View>
              <Text fontWeight="light" px="4">
                Connect with Us
              </Text>
            </HStack>
          </HStack>
          <Divider bg="#F7F9FB" />
        </Pressable>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(KYCPage);
