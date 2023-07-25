import { getUserData } from '@api/Auth/auth';
import { useGetAllTransactions } from '@api/hooks/useTransactions';
import {
  AEDC,
  Airtel,
  Airtime,
  BuyGiftCard,
  Cable,
  CardsCircle,
  Data,
  Dstv,
  EEDC,
  EkoElectri,
  Glo,
  Gotv,
  IBEDC,
  IkejaElectri,
  JOSElectri,
  KadunaElectri,
  KanoElectri,
  MTN,
  More,
  NMobile,
  NotificationBell,
  PHElectri,
  SellGiftCard,
  Smile,
  Spectranet,
  StartIme,
  Transaction,
  UtilitiesCircle,
  WalletCircle,
} from '@assets/SVG';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useCurrency } from '@hooks/useCurrency';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BoldText } from '@scenes/LoginPage';
import { CurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import * as dayjs from 'dayjs';
import { Avatar, Box, Button, HStack, Image, Pressable, ScrollView, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo } from 'react';
import { RefreshControl } from 'react-native';

export function BillAvatar(type: string) {
  switch (type?.toLowerCase()) {
    case 'mtn':
      return <MTN />;
    case 'airtel':
      return <Airtel />;
    case '9mobile':
      return <NMobile />;
    case 'glo':
      return <Glo />;
    case 'smile':
      return <Smile />;
    case 'spectranet':
      return <Spectranet />;
    case 'dstv':
      return <Dstv />;
    case 'gotv':
      return <Gotv />;
    case 'eko':
      return <EkoElectri />;
    case 'abuja':
      return <AEDC />;
    case 'ibadan':
      return <IBEDC />;
    case 'ikeja':
      return <IkejaElectri />;
    case 'kaduna':
      return <KadunaElectri />;
    case 'kano':
      return <KanoElectri />;
    case 'porthacourt':
      return <PHElectri />;
    case 'jos':
      return <JOSElectri />;
    case 'enugu':
      return <EEDC />;
    case 'startimes':
      return <StartIme />;
    default:
      return <UtilitiesCircle />;
  }
}

export const Money = (amount: any, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'NGN',

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
      return 'Good Morning ☀️';
    } else if (curHr < 18) {
      return 'Good Afternoon ☀️';
    } else {
      return 'Good Evening 🌑';
    }
  };
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <HStack>
        <Pressable w="10" onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Avatar
            bg="cyan.500"
            borderColor="white"
            borderWidth="1"
            size="12"
            source={{
              uri: data?.image_url,
            }}>
            {data?.username?.toString()[0]}
          </Avatar>
        </Pressable>
        <VStack px="4">
          <Text fontSize="xs" fontWeight="light" color="CARDVESTGREY.400">
            {getGreating()}
          </Text>
          <Text fontSize="lg" color="CARDVESTBLACK.50">
            {!data?.firstname && !data?.lastname && data?.username?.toString()}
            {data?.firstname && data?.lastname && data?.firstname?.toString()}{' '}
            {data?.firstname && data?.lastname && data?.lastname?.toString()}
          </Text>
        </VStack>
      </HStack>
      <Pressable onPress={() => navigation.navigate('Notifications' as any)} width="10" h="10">
        <NotificationBell hasNotification={false} />
      </Pressable>
    </HStack>
  );
};

export const BalancePanel = (props: { defaultCurrency: string; setCurrency?: any; userData?: any }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, handleSwitchCurrency, currencyWallet } = useCurrency();
  const balance = currencyWallet?.balance;
  return (
    <Box position="relative" justifyContent="flex-start" mb="10" mt="4">
      <Image source={img} alt="image" borderRadius="lg" minH="195" w="100%" />
      <VStack pt="4" pb="8" px="5" position="absolute" w="100%">
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text color="white" fontSize="md">
            Wallet Balance
          </Text>
          <CurrencyPicker {...{ currency, setCurrency: handleSwitchCurrency }} />
        </HStack>
        <HStack pb="3">
          <Text color="white" fontSize="2xl" w="70%" numberOfLines={1}>
            {currency === 'NGN' ? '₦' : '₵'}
            {Money(balance || 0, currency) || 0}
          </Text>
        </HStack>
        <View my="1.5" />

        <HStack space={3}>
          <Pressable
            flex={1}
            onPress={() => navigation.navigate('Withdraw')}
            borderRadius="lg"
            justifyContent="center"
            borderWidth={1}
            borderColor={'#FAC915'}
            backgroundColor={'#FAC915'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text w="100%" textAlign={'center'} px="1" color="black">
                Withdraw
              </Text>
            </HStack>
          </Pressable>
          <Pressable
            flex={1}
            opacity={currency !== 'NGN' ? 50 : 100}
            isDisabled={currency !== 'NGN'}
            onPress={() =>
              navigation.navigate(
                props?.userData?.has_virtual_account
                  ? 'VBADetails'
                  : props?.userData?.banking_verified
                  ? 'IdentityVerifiedSuccessPage'
                  : 'VBAPage',
              )
            }
            borderRadius="lg"
            justifyContent="center"
            borderColor={'white'}
            borderWidth={1}
            backgroundColor={'rgba(255, 255, 255, 0.2)'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                Fund {currency !== 'NGN' && '⏳'}
              </Text>
            </HStack>
          </Pressable>
        </HStack>
        {/* )} */}
      </VStack>
    </Box>
  );
};

export const EmptyPanel = ({
  title = 'No Recent Transaction',
  body = 'Trade now to get started',
  Icon,
  action,
  actionText,
}: {
  title?: string;
  body?: string;
  Icon?: any;
  actionText?: string;
  action?: any;
}) => (
  <VStack alignItems="center">
    <View h="90" w="90" mx="10" mb="6" mt="2">
      {Icon ? <Icon /> : <Transaction />}
    </View>
    <Text fontSize="lg" textAlign="center" color="CARDVESTBLACK.50">
      {title}
    </Text>
    <Text fontSize="sm" fontWeight="light" textAlign="center" color="CARDVESTGREY.400">
      {body}
    </Text>

    {action && (
      <VStack mt="6">
        <Button onPress={action} my="3" size="lg" p="4" fontSize="md" backgroundColor="CARDVESTGREEN" color="white">
          {actionText}
        </Button>
      </VStack>
    )}
  </VStack>
);

export const TransDate: (created_at: any) => string = created_at => {
  // yesterday: you check if someDate is current date - 1 day
  const isYesterday = dayjs.default(created_at).isSame(dayjs.default().subtract(1, 'day'));

  // today: just check if some date is equal to current date
  const isToday = dayjs.default(created_at).isSame(dayjs.default()); // dayjs() return current date

  // want to get back to plain old JS date
  const plainOldJsDate = dayjs.default(created_at).format('dddd, DD MMMM, YYYY');
  if (isYesterday) {
    return 'Yesterday';
  } else if (isToday) {
    return 'Today';
  } else {
    return plainOldJsDate;
  }
};

export const TransactionPanel = ({ data, currency, type }: { data: any; currency: string; type?: any }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  // console.log('TRANSACTION PANEL DATA', data);
  // console.log('CURRENCY', currency);
  // console.log('TYPE', type);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('TradeDetail', {
          id: data?.reference,
          transactionData: data,
          type,
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
          {type === 'withdrawals' && (
            <View w="10" h="10">
              <WalletCircle />
            </View>
          )}
          {type === 'cards' && (
            <View w="10" h="10">
              <CardsCircle />
            </View>
          )}
          {type === 'utilities' && (
            <View w="10" h="10">
              {BillAvatar(data?.bill?.product)}
            </View>
          )}
          <VStack mx="3">
            <Text color="CARDVESTBLACK.50" style={{ textTransform: 'capitalize' }} fontSize="md">
              {data?.card?.category_name}
              {data?.type || type}
              {/* {type === 'wallet' && 'Wallet'}
              {type === 'withdrawals' && 'Withdrawals'} */}
              {type === 'utilities' && data?.bill?.product}
            </Text>
            <Text color="CARDVESTGREY.400" fontSize="xs" fontWeight="light">
              {dayjs.default(data?.created_at).format('hh:mmA')}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end">
          <Text color="CARDVESTBLACK.50" fontSize="md">
            {data?.type === 'sell' ? '+' : data?.isDebit ? '-' : '+'}
            {currency} {Money(data?.amount, currency)}
          </Text>
          <Text
            style={{ textTransform: 'capitalize' }}
            color={data?.status === 'pending' ? '#FFCE31' : data?.status === 'succeed' ? 'green.700' : '#FF0000'}
            fontSize="xs">
            {data?.status === 'succeed' ? 'successful' : data?.status}
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
  const { currency, handleRefreshCurrency } = useCurrency();
  const queryClient = useQueryClient();
  const { data: opps, isFetched } = useGetAllTransactions(currency);
  const { isFetching, data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await cacheService.get('login-user');
      const res = await getUserData(token);
      await queryClient.setQueryData([`user`], res?.data);
      await cacheService.put('user', res?.data);
      return res?.data;
    },
  });
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await handleRefreshCurrency();
      setRefreshing(false);
    } catch (error) {
      console.error('refresh ', error);
    }
  }, []);

  const getTrancationData = useMemo(
    () => ({
      ...opps?.pages[0],
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

  if (isFetching || !isFetched) return <CLoader />;

  console.log('USER DATA', userData);

  return (
    <CSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
        }}>
        <GreetingPanel />
        <BalancePanel defaultCurrency={currency} userData={userData} />
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
              action: () => navigation.navigate('More'),
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
            {getTrancationData?.data?.length === 0 ? (
              <EmptyPanel action={() => navigation.navigate('BuyGiftCard')} actionText="Trade Now" />
            ) : (
              Object.keys(a).map((key, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                      {TransDate(key)}
                    </BoldText>
                    {a[key].map((item: any, ind: number) => (
                      <TransactionPanel type={'cards'} currency={currency} data={item} key={ind} />
                    ))}
                  </React.Fragment>
                );
              })
            )}
          </View>
        </VStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Dashboard);
