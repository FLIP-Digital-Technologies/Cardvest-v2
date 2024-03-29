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

const FirstRoute = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page] = useState(1);
  const { data: opps, isFetching, isLoading, fetchNextPage } = useGetAllTransactions(currency, page);
  const getTrancationData = useMemo(
    () => ({
      ...opps?.pages[page - 1],
      data: opps?.pages?.flatMap((page, i) => page.data.map((data: any) => data)),
    }),
    [opps],
  );
  const a = useMemo(() => {
    const b: any = {};
    getTrancationData?.data?.map((i: any) => {
      // @ts-ignore
      b[i?.created_at?.slice(0, 10)] =
        b[i?.created_at?.slice(0, 10)]?.length > 0 ? [...b[i?.created_at?.slice(0, 10)], i] : [i];
    });
    return b;
  }, [getTrancationData]);
  if (isLoading) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="100%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel action={() => navigation.navigate('SellGiftCard')} actionText="Trade Now" />
      </View>
    );
  return (
    <View w="100%" mb="8" h="full">
      <FlatList
        data={Object.keys(a)}
        renderItem={({ item }) => {
          return (
            <React.Fragment>
              <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                {TransDate(item)}
              </BoldText>
              {a[item].map((item: any, ind: number) => (
                <TransactionPanel currency={currency} data={item} type={'cards'} key={ind} />
              ))}
            </React.Fragment>
          );
        }}
        keyExtractor={(item: any) => item}
        onRefresh={() => queryClient.invalidateQueries([`transactions-${currency}`])}
        refreshing={isFetching}
        onEndReached={
          getTrancationData?.meta?.current_page < getTrancationData?.meta?.last_page
            ? () => fetchNextPage()
            : () => null
        }
      />
    </View>
  );
};

const SecondRoute = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page] = useState(1);
  const { data: opps, isFetching, isLoading, fetchNextPage } = useGetPayoutTransactions(currency, page);

  console.log('wallet transactions', opps?.pages[0]?.data);

  const getTrancationData = useMemo(
    () => ({
      ...opps?.pages[page - 1],
      data: opps?.pages?.flatMap((page, i) => page.data.map(data => data)),
    }),
    [opps],
  );
  const a = useMemo(() => {
    const b: any = {};
    getTrancationData?.data?.map((i: any) => {
      // @ts-ignore
      b[i?.created_at?.slice(0, 10)] =
        b[i?.created_at?.slice(0, 10)]?.length > 0 ? [...b[i?.created_at?.slice(0, 10)], i] : [i];
    });
    return b;
  }, [getTrancationData]);

  if (isLoading) return <CLoader />;

  if (getTrancationData?.data?.length === 0)
    return (
      <View w="100%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel action={() => navigation.navigate('BuyGiftCard')} actionText="Trade Now" />
      </View>
    );

  return (
    <View w="100%" mb="8" h="full">
      <FlatList
        data={Object.keys(a)}
        renderItem={({ item }) => {
          return (
            <React.Fragment>
              <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                {TransDate(item)}
              </BoldText>
              {a[item].map((item: any, ind: number) => (
                <TransactionPanel currency={currency} data={item} type={'cards'} key={ind} />
              ))}
            </React.Fragment>
          );
        }}
        keyExtractor={(item: any) => item}
        onRefresh={() => queryClient.invalidateQueries([`payout-transactions-${currency}`])}
        refreshing={isFetching}
        onEndReached={
          getTrancationData?.meta?.current_page < getTrancationData?.meta?.last_page
            ? () => fetchNextPage()
            : () => null
        }
      />
    </View>
  );
};

const ThirdRoute = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page] = useState(1);
  const { data: opps, isFetching, isLoading, fetchNextPage } = useGetAllBillTransactions(currency, page);
  const getTrancationData = useMemo(
    () => ({
      ...opps?.pages[page - 1],
      data: opps?.pages?.flatMap((page, i) => page.data.map(data => data)),
    }),
    [opps],
  );
  const a = useMemo(() => {
    const b: any = {};
    getTrancationData?.data?.map((i: any) => {
      // @ts-ignore
      b[i?.created_at?.slice(0, 10)] =
        b[i?.created_at?.slice(0, 10)]?.length > 0 ? [...b[i?.created_at?.slice(0, 10)], i] : [i];
    });
    return b;
  }, [getTrancationData]);
  if (isLoading) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="100%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel action={() => navigation.navigate('More')} actionText="Pay Bills" />
      </View>
    );
  return (
    <View w="100%" mb="8" h="full">
      <FlatList
        data={Object.keys(a)}
        renderItem={({ item }) => {
          return (
            <React.Fragment>
              <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                {TransDate(item)}
              </BoldText>
              {a[item].map((item: any, ind: number) => (
                <TransactionPanel currency={currency} data={item} type={'utilities'} key={ind} />
              ))}
            </React.Fragment>
          );
        }}
        keyExtractor={(item: any) => item}
        onRefresh={() => queryClient.invalidateQueries([`transactions-bill-${currency}`])}
        refreshing={isFetching}
        onEndReached={
          getTrancationData?.meta?.current_page < getTrancationData?.meta?.last_page
            ? () => fetchNextPage()
            : () => null
        }
      />
    </View>
  );
};

const initialLayout = {
  width: Dimensions.get('window').width,
};

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const TransactionHistoryPage: FC<{ route: any }> = ({ route }) => {
  const { params = { tab: 0 } } = route;
  const { tab = 0 } = params;
  const navigation = useNavigation<GenericNavigationProps>();
  const [index, setIndex] = React.useState(tab);
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
