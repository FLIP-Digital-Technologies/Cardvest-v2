/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAllTransactions, useGetPayoutTransactions } from '@api/hooks/useTransactions';
import { BackButton } from '@assets/SVG';
import CLoader from '@components/CLoader';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel, TransactionPanel } from '@scenes/DashboardPage';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Center, useColorModeValue, Pressable, Text, View, ScrollView, HStack, FlatList } from 'native-base';
import React, { FC, memo, useState } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const arr: string[] = ['', '', ''];

const FirstRoute = () => {
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data: getTrancationData, isFetching, isLoading } = useGetAllTransactions(currency, page);
  console.log(getTrancationData);
  if (isFetching) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="90%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel />
      </View>
    );
  return (
    <View w="90%" my="8">
      <FlatList
        data={getTrancationData?.data}
        renderItem={({ item }) => <TransactionPanel data={item} currency={'NGN'} />}
        keyExtractor={(item: any) => item?.id}
        onRefresh={() => queryClient.invalidateQueries([`transactions-${currency}`])}
        refreshing={isLoading}
        // onEndReached={() => setPage(page + 1)}
      />
    </View>
  );
};

const SecondRoute = () => {
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data: getTrancationData, isFetching, isLoading } = useGetPayoutTransactions(currency, page);
  if (isFetching) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="90%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel />
      </View>
    );
  return (
    <View w="90%" my="8">
      <FlatList
        data={getTrancationData?.data}
        renderItem={({ item }) => <TransactionPanel data={item} currency={'NGN'} />}
        keyExtractor={(item: any) => item?.id}
        onRefresh={() => queryClient.invalidateQueries([`payout-transactions-${currency}`])}
        refreshing={isLoading}
        // onEndReached={() => setPage(page + 1)}
      />
    </View>
  );
};

const ThirdRoute = () => {
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const { data: getTrancationData, isFetching, isLoading } = useGetAllTransactions(currency, page);
  console.log(getTrancationData);
  if (isFetching) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="90%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel />
      </View>
    );
  return (
    <View w="90%" my="8">
      <FlatList
        data={[]}
        renderItem={({ item }) => <TransactionPanel data={item} currency={'NGN'} />}
        keyExtractor={(item: any) => item.id}
        onRefresh={() => queryClient.invalidateQueries([`transactions-${currency}`])}
        refreshing={isLoading}
        // onEndReached={() => setPage(page + 1)}
      />
    </View>
  );
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const TransactionHistoryPage: FC<{ route: any }> = ({ route }) => {
  const { params = { tab: 0 } } = route;
  const { tab } = params;
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const navigation = useNavigation<GenericNavigationProps>();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(tab || 0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Giftcard',
    },
    {
      key: 'second',
      title: 'Wallets',
    },
    {
      key: 'third',
      title: 'Utilities',
    },
  ]);

  const renderTabBar = (props: any) => {
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
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} key={i} alignItems="center" p="3">
              <Pressable
                onPress={() => {
                  console.log(i);
                  if (i === 0) queryClient.invalidateQueries([`transactions-${currency}`]);
                  if (i === 1) queryClient.invalidateQueries([`payout-transactions-${currency}`]);
                  if (i === 2) queryClient.invalidateQueries([`transactions-${currency}`]);
                  setIndex(i);
                }}>
                <Animated.Text
                  style={{
                    color,
                  }}>
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <React.Fragment>
      <HStack w="100%" alignItems="center" pt="20" px="4">
        <Pressable h="10" w="10" onPress={() => navigation.navigate('Dashboard')}>
          <BackButton />
        </Pressable>
        <Text fontSize="md" mx="auto" textAlign="center">
          Transaction History
        </Text>
        <View w="10" />
      </HStack>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{
          marginTop: -20,
          padding: '5%',
        }}
      />
    </React.Fragment>
  );
};

export default memo(TransactionHistoryPage);
