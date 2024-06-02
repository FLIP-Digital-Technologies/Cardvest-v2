/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAllBillTransactions, useGetAllTransactions, useGetPayoutTransactions } from '@api/hooks/useTransactions';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel, TransDate, TransactionPanel } from '@scenes/DashboardPage';
import { BoldText } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { Box, FlatList, Pressable, Text, View, useColorModeValue } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import CryptoHistory from './components/crypto';
import GiftcardHistory from './components/giftcard';
import UtilitiesHistory from './components/utilities';
import WalletsHistory from './components/wallets';

const initialLayout = {
  width: Dimensions.get('window').width,
};

const renderScene = SceneMap({
  giftcard: GiftcardHistory,
  wallets: WalletsHistory,
  utilities: UtilitiesHistory,
  crypto: CryptoHistory,
});

const TransactionHistoryPage: FC<{ route: any }> = ({ route }) => {
  const { params = { tab: 0 } } = route;
  const { tab = 0 } = params;
  const navigation = useNavigation<GenericNavigationProps>();
  const [index, setIndex] = React.useState(tab);
  const [routes] = React.useState([
    {
      key: 'giftcard',
      title: 'Giftcard',
    },
    {
      key: 'wallets',
      title: 'Wallets',
    },
    {
      key: 'utilities',
      title: 'Utilities',
    },
    {
      key: 'crypto',
      title: 'Crypto',
    },
  ]);

  const renderdTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map((x: any, i: number) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) => (inputIndex === i ? 1 : 0.5)),
          });
          const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
          const borderColor = index === i ? 'CARDVESTGREEN' : useColorModeValue('coolGray.200', 'gray.400');
          return (
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
              <Pressable
                onPress={() => {
                  setIndex(i);
                }}>
                <Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <React.Fragment>
      <BackButtonTitleCenter noScroll title="Transaction History" backAction={() => navigation.goBack()}>
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderdTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          style={{
            marginTop: -20,
            paddingTop: '5%',
          }}
        />
      </BackButtonTitleCenter>
    </React.Fragment>
  );
};

export default memo(TransactionHistoryPage);
