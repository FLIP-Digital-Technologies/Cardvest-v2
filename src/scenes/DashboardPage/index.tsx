import { getUserData } from '@api/Auth/auth';
import { useGetAllTransactions } from '@api/hooks/useTransactions';
import {
  NotificationBell,
  Withdrawal,
  SellGiftCard,
  BuyGiftCard,
  Data,
  Airtime,
  Cable,
  More,
  Transaction,
  Deposit,
} from '@assets/SVG';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { CurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import * as dayjs from 'dayjs';
import { Avatar, Box, HStack, Image, ScrollView, Text, View, VStack, Pressable, Button, FlatList } from 'native-base';
import React, { FC, memo, SetStateAction, Dispatch, ReactElement, JSXElementConstructor } from 'react';
import { useTranslation } from 'react-i18next';
import { getWidth } from '../../App';

export const Money = (amount: any, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  })
    .format(amount)
    .replace(currency, '');

export const GreetingPanel = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['user']);
  const getGreating: () => string = () => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <HStack>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Avatar
            bg="cyan.500"
            borderColor="white"
            borderWidth="1"
            size="12"
            source={{
              uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}>
            {data?.username?.toString()[0]}
          </Avatar>
        </Pressable>
        <VStack px="4" width={getWidth()}>
          <Text fontSize="xs" fontWeight="light" color="CARDVESTGREY.400">
            {getGreating()}
          </Text>
          <Text fontSize="lg" color="CARDVESTBLACK.50">
            {data?.username?.toString()}
          </Text>
        </VStack>
      </HStack>
      <Pressable onPress={() => navigation.navigate('Notifications')} width="10" h="10">
        <NotificationBell hasNotification={false} />
      </Pressable>
    </HStack>
  );
};

export const BalancePanel = ({
  defaultCurrency,
  withDeposit = false,
}: {
  defaultCurrency: string;
  setCurrency?: any;
  withDeposit?: boolean;
}) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, handleSwitchCurrency, currencyWallet } = useCurrency(defaultCurrency);
  const balance = currencyWallet?.balance;
  return (
    <Box position="relative" justifyContent="flex-start" mb="10" mt="4">
      <Image source={img} alt="image" borderRadius="lg" minH="195" w="100%" />
      <VStack py="8" px="5" position="absolute" w="100%">
        <View>
          <Text color="white" fontSize="md">
            Wallet Balance
          </Text>
        </View>
        <HStack pb="3" justifyContent={'space-between'} alignItems={'center'}>
          <Text color="white" fontSize="2xl" w="70%" numberOfLines={1}>
            {currency === 'NGN' ? '₦' : '₵'}
            {Money(balance, currency)}
          </Text>
          <CurrencyPicker {...{ currency, setCurrency: handleSwitchCurrency }} />
        </HStack>
        {withDeposit ? (
          <Button.Group>
            <Pressable
              w="48%"
              onPress={() => navigation.navigate('Withdraw')}
              borderRadius="lg"
              backgroundColor={'#FAC915'}>
              <HStack p="4" w="100%" justifyContent="center" alignItems="center">
                <View width="5" h="5">
                  <Withdrawal />
                </View>
                <Text px="1" color="black">
                  Withdraw
                </Text>
              </HStack>
            </Pressable>
            <Pressable
              w="48%"
              onPress={() => navigation.navigate('Deposit')}
              borderRadius="lg"
              backgroundColor={'#FAC915'}>
              <HStack p="4" justifyContent="center" alignItems="center">
                <View width="5" h="5">
                  <Deposit />
                </View>
                <Text px="1" color="black">
                  Deposit
                </Text>
              </HStack>
            </Pressable>
          </Button.Group>
        ) : (
          <Pressable
            w="100%"
            onPress={() => navigation.navigate('Withdraw')}
            borderRadius="lg"
            backgroundColor={'#FAC915'}>
            <HStack p="4" justifyContent="center" alignItems="center">
              <View width="5" h="5">
                <Withdrawal />
              </View>
              <Text w="40%" px="1" color="black">
                Withdraw Funds
              </Text>
            </HStack>
          </Pressable>
        )}
      </VStack>
    </Box>
  );
};

export const EmptyPanel = () => (
  <VStack alignItems="center">
    <View h="90" w="90" mx="10" mb="6" mt="2">
      <Transaction />
    </View>
    <Text fontSize="lg" color="CARDVESTBLACK.50">
      No Recent Transaction
    </Text>
    <Text fontSize="sm" fontWeight="light" color="CARDVESTGREY.400">
      Trade now to get started
    </Text>
  </VStack>
);

export const TransactionPanel = ({ data, currency }: { data: any; currency: string }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  // console.log(JSON.parse(data?.images)?.[0]);

  const TransDate: () => string = () => {
    // yesterday: you check if someDate is current date - 1 day
    const isYesterday = dayjs.default(data?.created_at).isSame(dayjs.default().subtract(1, 'day'));

    // today: just check if some date is equal to current date
    const isToday = dayjs.default(data?.created_at).isSame(dayjs.default()); // dayjs() return current date

    // want to get back to plain old JS date
    const plainOldJsDate = dayjs.default(data?.created_at).toDate().toDateString();
    if (isYesterday) {
      return 'Yesterday';
    } else if (isToday) {
      return 'Today';
    } else {
      return plainOldJsDate;
    }
  };
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('TradeDetail', {
          id: data?.reference,
        })
      }>
      <HStack
        backgroundColor="#F9F9F9"
        px="3"
        py="5"
        mb="3"
        borderRadius="lg"
        justifyContent="space-between"
        alignItems="center">
        <HStack alignItems="center">
          {/* <Avatar
            bg="cyan.500"
            borderColor="white"
            borderWidth="1"
            size="12"
            source={{
              uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}>
            TE
          </Avatar> */}
          <VStack mx="4">
            <Text color="CARDVESTBLACK.50" style={{ textTransform: 'capitalize' }} fontSize="md">
              {data?.card && 'Gift Card'} {data?.type}
            </Text>
            <Text color="CARDVESTGREY.400" fontSize="xs" fontWeight="light">
              {TransDate()}, {dayjs.default(data?.created_at).format('hh:mmA')}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end">
          <Text color="CARDVESTBLACK.50" fontSize="md">
            {data?.type === 'sell' ? '+' : '-'}
            {currency} {Money(data?.amount, currency)}
          </Text>
          <Text color="green.700" fontSize="xs">
            {data?.status}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export const MenuCard = ({
  title,
  action,
  icon,
  ind,
}: {
  title: string;
  ind: number;
  action: () => void;
  icon: JSX.Element;
}) => (
  <Pressable w="33.3%" h="123" onPress={action}>
    <Box mx={ind % 3 === 1 ? '1' : '0'} my="2" backgroundColor="#FAFAF0" borderRadius="6">
      <VStack p="4" alignItems="center">
        <View h="16" w="90" p="2">
          {icon}
        </View>
        <Text fontSize="xs">{title}</Text>
      </VStack>
    </Box>
  </Pressable>
);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const img = require('../../assets/images/BalanceBG.png');

const Dashboard: FC = () => {
  // const [t, i18n] = useTranslation();
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, currencyLoading } = useCurrency();
  const queryClient = useQueryClient();
  const { data: getTrancationData, isFetched } = useGetAllTransactions(currency);
  const { isFetching }: any = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await cacheService.get('login-user');
      const res = await getUserData(token);
      await queryClient.setQueryData([`user`], res?.data);
      await cacheService.put('user', res?.data);
      return res?.data;
    },
  });
  if (isFetching || !isFetched) return <CLoader />;

  return (
    <CSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
        }}>
        <GreetingPanel />
        <BalancePanel defaultCurrency={currency} />
        <HStack justifyContent="space-between" flexWrap={'wrap'}>
          {[
            {
              title: 'Sell Giftcard',
              action: () => navigation.navigate('SellGiftCard'),
              icon: <SellGiftCard />,
            },
            {
              title: 'Buy Giftcard',
              action: () => navigation.navigate('BuyGiftCard'),
              icon: <BuyGiftCard />,
            },
            {
              title: 'Data',
              action: () => navigation.navigate('BuyDate'),
              icon: <Data />,
            },
            {
              title: 'Airtime',
              action: () => navigation.navigate('BuyAirtime'),
              icon: <Airtime />,
            },
            {
              title: 'Cable',
              action: () => navigation.navigate('Cable'),
              icon: <Cable />,
            },
            {
              title: 'More',
              action: () => navigation.navigate('sell'),
              icon: <More />,
            },
          ].map((item, index) => (
            <MenuCard ind={index} key={index} title={item.title} action={item.action} icon={item.icon} />
          ))}
        </HStack>
        <VStack my="5">
          <View>
            <HStack mb="4" justifyContent="space-between">
              <Text>Recent Transactions</Text>
              <Pressable onPress={() => navigation.navigate('TransactionHistory', { tab: 0 })}>
                <Text underline color="green.900">
                  Show All
                </Text>
              </Pressable>
            </HStack>
            {/* // TODO: make into a flatlist */}
            {getTrancationData?.data?.length === 0 ? (
              <EmptyPanel />
            ) : (
              getTrancationData?.data?.map((item: any, ind: number) => (
                <TransactionPanel currency={currency} data={item} key={ind} />
              ))
            )}
          </View>
        </VStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Dashboard);
