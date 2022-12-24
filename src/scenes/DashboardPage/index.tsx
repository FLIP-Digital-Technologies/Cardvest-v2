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
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { CurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Avatar, Box, HStack, Image, ScrollView, Text, View, VStack, Pressable, Button } from 'native-base';
import React, { FC, memo, SetStateAction, Dispatch, ReactElement, JSXElementConstructor } from 'react';
import { useTranslation } from 'react-i18next';

export const GreetingPanel = () => {
  const navigation = useNavigation();
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
            TE
          </Avatar>
        </Pressable>
        <VStack px="4">
          <Text fontSize="xs" fontWeight="light" color="CARDVESTGREY.400">
            Good Morning☀
          </Text>
          <Text fontSize="lg" color="CARDVESTBLACK.50">
            Kenny Michael
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
  currency,
  setCurrency,
  withDeposit = false,
}: {
  currency: string;
  setCurrency: Dispatch<SetStateAction<string>>;
  withDeposit?: boolean;
}) => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <Box position="relative" justifyContent="flex-start" mb="10" mt="4">
      <Image source={img} alt="image" borderRadius="lg" minH="195" w="100%" />
      <VStack py="8" px="5" position="absolute" w="100%">
        <View>
          <Text color="white" fontSize="md">
            Wallet Balance
          </Text>
        </View>
        <HStack pb="3" justifyContent={'space-between'}>
          <Text color="white" fontSize="4xl">
            {currency === 'ngn' ? '₦' : '₵'} 65,009.89
          </Text>
          <CurrencyPicker {...{ currency, setCurrency }} />
        </HStack>
        {withDeposit ? (
          <Button.Group>
            <Pressable
              w="48%"
              onPress={() => navigation.navigate('Withdraw')}
              borderRadius="lg"
              backgroundColor={'#FAC915'}>
              <HStack p="4" justifyContent="center" alignItems="center">
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
          <Pressable onPress={() => navigation.navigate('Withdraw')} borderRadius="lg" backgroundColor={'#FAC915'}>
            <HStack p="4" justifyContent="center" alignItems="center">
              <View width="5" h="5">
                <Withdrawal />
              </View>
              <Text px="1" color="black">
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

export const TransactionPanel = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <Pressable onPress={() => navigation.navigate('TradeDetail')}>
      <HStack
        backgroundColor="#F9F9F9"
        px="3"
        py="5"
        mb="3"
        borderRadius="lg"
        justifyContent="space-between"
        alignItems="center">
        <HStack alignItems="center">
          <Avatar
            bg="cyan.500"
            borderColor="white"
            borderWidth="1"
            size="12"
            source={{
              uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            }}>
            TE
          </Avatar>
          <VStack mx="4">
            <Text color="CARDVESTBLACK.50" fontSize="md">
              Gift Card Sell
            </Text>
            <Text color="CARDVESTGREY.400" fontSize="xs" fontWeight="light">
              Today, 10:14AM
            </Text>
          </VStack>
        </HStack>
        <VStack alignItems="flex-end">
          <Text color="CARDVESTBLACK.50" fontSize="md">
            +NGN 20,000
          </Text>
          <Text color="green.700" fontSize="xs">
            Successful
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
  icon: () => () => ReactElement<any, JSXElementConstructor<any>>;
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
  const [t, i18n] = useTranslation();
  const [currency, setCurrency] = React.useState('ngn');
  const navigation = useNavigation<GenericNavigationProps>();

  const arr: string[] = ['', '', ''];
  return (
    <CSafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
        }}>
        <GreetingPanel />
        <BalancePanel {...{ currency, setCurrency }} />
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
            {arr.length === 0 ? <EmptyPanel /> : arr.map(item => <TransactionPanel />)}
          </View>
        </VStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Dashboard);
