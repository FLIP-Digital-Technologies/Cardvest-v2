import {
  AirtimeMore,
  BuyGiftCardMore,
  CableMore,
  DataMore,
  ElectricityMore,
  RightAngle,
  SellGiftCardMore,
  WifiMore,
} from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Divider, HStack, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

const MorePage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="More">
      <VStack my="7">
        {[
          {
            title: 'Sell Giftcard',
            action: () => navigation.navigate('SellGiftCard'),
            icon: <SellGiftCardMore />,
          },
          {
            title: 'Buy Giftcard',
            action: () => navigation.navigate('BuyGiftCard'),
            icon: <BuyGiftCardMore />,
          },
          {
            title: 'Data',
            action: () => navigation.navigate('BuyDate'),
            icon: <DataMore />,
          },
          {
            title: 'Airtime',
            action: () => navigation.navigate('BuyAirtime'),
            icon: <AirtimeMore />,
          },
          {
            title: 'Cable',
            action: () => navigation.navigate('Cable'),
            icon: <CableMore />,
          },
          {
            title: 'Wifi',
            action: () => navigation.navigate('BuyWifi'),
            icon: <WifiMore />,
          },
          {
            title: 'Electricity',
            action: () => navigation.navigate('BuyElectricity'),
            icon: <ElectricityMore />,
          },
        ].map((item, index) => (
          <Pressable key={index} onPress={item.action}>
            <HStack py="4" justifyContent="space-between" alignItems="center">
              <HStack justifyContent="space-between" alignItems="center">
                <View width="5" h="8" mx="3">
                  {item.icon}
                </View>
                <Text fontWeight="light" px="4">
                  {item.title}
                </Text>
              </HStack>
              <View width="5" h="8">
                <RightAngle />
              </View>
            </HStack>
            {index !== 3 && <Divider bg="#F7F9FB" />}
          </Pressable>
        ))}
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(MorePage);
