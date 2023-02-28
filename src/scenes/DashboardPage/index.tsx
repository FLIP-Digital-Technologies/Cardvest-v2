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
  WalletCircle,
  CardsCircle,
  UtilitiesCircle,
  MTN,
  Airtel,
  NMobile,
  Glo,
  Smile,
  Spectranet,
  Dstv,
  Gotv,
  JOSElectri,
  PHElectri,
  KanoElectri,
  KadunaElectri,
  IkejaElectri,
  IBEDC,
  AEDC,
  EkoElectri,
  EEDC,
  StartIme,
} from '@assets/SVG';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BoldText } from '@scenes/LoginPage';
import { CurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import * as dayjs from 'dayjs';
import { Avatar, Box, HStack, Image, ScrollView, Text, View, VStack, Pressable, Button, Alert } from 'native-base';
import React, { FC, memo, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import { Path, Rect, Svg } from 'react-native-svg';

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
      <Pressable onPress={() => navigation.navigate('Notifications')} width="10" h="10">
        <NotificationBell hasNotification={false} />
      </Pressable>
    </HStack>
  );
};

export const BalancePanel = ({
  withDeposit = false,
}: {
  defaultCurrency: string;
  setCurrency?: any;
  withDeposit?: boolean;
}) => {
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
              // onPress={() => navigation.navigate('Deposit')}
              borderRadius="lg"
              backgroundColor={'#FAC915'}>
              <HStack p="4" justifyContent="center" alignItems="center" flexWrap="nowrap">
                <View width="5" h="5">
                  <Deposit />
                </View>
                <Text px="1" color="black">
                  Deposit{' '}
                </Text>

                <Svg width="55" height="22" viewBox="0 0 82 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <Rect x="0.239258" width="80" height="22" rx="3" fill="#C90000" />
                  <Path
                    d="M14.0293 15.11C15.5693 15.11 16.8193 14.2 17.1493 12.85H16.3793C16.0693 13.81 15.1693 14.42 14.0393 14.42C12.4693 14.42 11.4193 13.22 11.4193 11.42C11.4193 9.61 12.4693 8.41 14.0393 8.41C15.1593 8.41 16.0393 9.04 16.3393 10.07H17.1093C16.8193 8.65 15.6093 7.72 14.0693 7.72C12.0493 7.72 10.6693 9.22 10.6693 11.42C10.6693 13.62 12.0293 15.11 14.0293 15.11ZM17.9044 12.58C17.9044 14.05 18.9444 15.12 20.3644 15.12C21.7844 15.12 22.8244 14.05 22.8244 12.58C22.8244 11.1 21.7844 10.03 20.3644 10.03C18.9444 10.03 17.9044 11.1 17.9044 12.58ZM18.6044 12.57C18.6044 11.45 19.3244 10.65 20.3644 10.65C21.3944 10.65 22.1244 11.45 22.1244 12.57C22.1244 13.71 21.3944 14.5 20.3644 14.5C19.3244 14.5 18.6044 13.71 18.6044 12.57ZM24.618 15V12C24.618 11.26 25.108 10.66 25.918 10.66C26.648 10.66 27.118 11.14 27.118 11.96V15H27.798V12.01C27.798 11.26 28.278 10.65 29.088 10.65C29.828 10.65 30.288 11.14 30.288 11.97V15H30.958V11.83C30.958 10.71 30.268 10.03 29.218 10.03C28.438 10.03 27.848 10.43 27.628 11.06C27.398 10.43 26.828 10.03 26.068 10.03C25.388 10.03 24.848 10.34 24.608 10.85L24.528 10.16H23.928V15H24.618ZM32.686 8.83C32.966 8.83 33.206 8.6 33.206 8.32C33.206 8.04 32.966 7.8 32.686 7.8C32.406 7.8 32.176 8.04 32.176 8.32C32.176 8.6 32.406 8.83 32.686 8.83ZM32.346 15H33.036V10.16H32.346V15ZM35.1649 15V12.47C35.1649 11.38 35.7249 10.66 36.7149 10.66C37.5149 10.66 38.0249 11.06 38.0249 12.19V15H38.7149V12.04C38.7149 10.82 38.1649 10.03 36.8349 10.03C36.1349 10.03 35.4949 10.38 35.1749 11L35.0749 10.16H34.4749V15H35.1649ZM39.7601 12.44C39.7601 13.76 40.6001 14.85 41.9801 14.85C42.8101 14.85 43.4801 14.45 43.8101 13.77V14.92C43.8101 15.93 43.1501 16.6 42.1601 16.6C41.2901 16.6 40.6901 16.14 40.5401 15.36H39.8501C40.0401 16.53 40.9101 17.23 42.1501 17.23C43.5701 17.23 44.4901 16.29 44.4901 14.85V10.16H43.8901L43.8201 11.13C43.5101 10.42 42.8701 10.03 42.0301 10.03C40.6101 10.03 39.7601 11.12 39.7601 12.44ZM40.4501 12.43C40.4501 11.45 41.0501 10.64 42.0901 10.64C43.1501 10.64 43.7501 11.4 43.7501 12.43C43.7501 13.47 43.1301 14.23 42.0801 14.23C41.0601 14.23 40.4501 13.42 40.4501 12.43ZM48.4234 9.7C48.4234 10.68 49.0134 11.32 50.1334 11.59L51.3434 11.89C52.1134 12.07 52.4734 12.49 52.4734 13.13C52.4734 13.95 51.8034 14.46 50.7534 14.46C49.7734 14.46 49.1134 13.97 49.0734 13.22H48.3334C48.4234 14.39 49.3634 15.12 50.7534 15.12C52.2334 15.12 53.1934 14.33 53.1934 13.09C53.1934 12.12 52.6134 11.48 51.4934 11.21L50.2634 10.91C49.5134 10.72 49.1434 10.32 49.1434 9.69C49.1434 8.88 49.8034 8.36 50.8134 8.36C51.7134 8.36 52.2634 8.82 52.3434 9.63H53.0734C52.9634 8.43 52.1134 7.71 50.8234 7.71C49.3834 7.71 48.4234 8.5 48.4234 9.7ZM53.9982 12.58C53.9982 14.05 55.0382 15.12 56.4582 15.12C57.8782 15.12 58.9182 14.05 58.9182 12.58C58.9182 11.1 57.8782 10.03 56.4582 10.03C55.0382 10.03 53.9982 11.1 53.9982 12.58ZM54.6982 12.57C54.6982 11.45 55.4182 10.65 56.4582 10.65C57.4882 10.65 58.2182 11.45 58.2182 12.57C58.2182 13.71 57.4882 14.5 56.4582 14.5C55.4182 14.5 54.6982 13.71 54.6982 12.57ZM59.6818 12.58C59.6818 14.05 60.7218 15.12 62.1418 15.12C63.5618 15.12 64.6018 14.05 64.6018 12.58C64.6018 11.1 63.5618 10.03 62.1418 10.03C60.7218 10.03 59.6818 11.1 59.6818 12.58ZM60.3818 12.57C60.3818 11.45 61.1018 10.65 62.1418 10.65C63.1718 10.65 63.9018 11.45 63.9018 12.57C63.9018 13.71 63.1718 14.5 62.1418 14.5C61.1018 14.5 60.3818 13.71 60.3818 12.57ZM66.3954 15V12.47C66.3954 11.38 66.9554 10.66 67.9454 10.66C68.7454 10.66 69.2554 11.06 69.2554 12.19V15H69.9454V12.04C69.9454 10.82 69.3954 10.03 68.0654 10.03C67.3654 10.03 66.7254 10.38 66.4054 11L66.3054 10.16H65.7054V15H66.3954Z"
                    fill="white"
                  />
                </Svg>
              </HStack>
            </Pressable>
          </Button.Group>
        ) : (
          <Pressable
            w="100%"
            onPress={() => navigation.navigate('Withdraw')}
            borderRadius="lg"
            justifyContent="center"
            mx="auto"
            backgroundColor={'#FAC915'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <View width="5" h="5">
                <Withdrawal />
              </View>
              <Text w="45%" px="1" color="black">
                Withdraw Funds
              </Text>
            </HStack>
          </Pressable>
        )}
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
  console.log(data);
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
              {type === 'withdrawals' && 'Withdrawals'}
              {type === 'utilities' && data?.bill?.product}
            </Text>
            <Text color="CARDVESTGREY.400" fontSize="xs" fontWeight="light">
              {dayjs.default(data?.created_at).format('hh:mmA')}
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end">
          <Text color="CARDVESTBLACK.50" fontSize="md">
            {data?.type === 'sell' ? '+' : '-'}
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
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await handleRefreshCurrency();
      setRefreshing(false);
    } catch (error) {
      console.error(error);
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
