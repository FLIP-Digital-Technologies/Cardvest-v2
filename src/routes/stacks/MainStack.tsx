/* eslint-disable react/no-unstable-nested-components */
import {
  Bank,
  BuyGiftCardMore,
  Calculator,
  CloseBtn,
  DrawerTopBG,
  Home,
  Logout,
  Love,
  Notification,
  RightAngle,
  Settings,
  Support,
  TransactionHistory,
  Wallet,
} from '@assets/SVG';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AddAccountFeedbackPage from '@scenes/AddAccountFeedbackPage';
import AddAccountPage from '@scenes/AddAccountPage';
import BanksPage from '@scenes/BanksPage';
import BillFeedbackPage from '@scenes/BillFeedbackPage';
import BuyAirtimePage from '@scenes/BuyAirtimePage';
import BuyCablePage from '@scenes/BuyCablePage';
import BuyDatePage from '@scenes/BuyDatePage';
import BuyElectricityPage from '@scenes/BuyElectricityPage';
import BuyGiftCardPage from '@scenes/BuyGiftCardPage';
import BuyGiftCardTradeFeedbackPage from '@scenes/BuyGiftCardTradeFeedbackPage';
import BuyGiftCardTradeSummaryPage from '@scenes/BuyGiftCardTradeSummaryPage';
import BuyWifiPage from '@scenes/BuyWifiPage';
import CalculatorPage from '@scenes/CalculatorPage';
import CardPage from '@scenes/CardPage';
import ChangePinPage from '@scenes/ChangePinPage';
import DashboardPage from '@scenes/DashboardPage';
import DeleteAccountFeedbackPage from '@scenes/DeleteAccountFeedbackPage';
import DeleteAccountPage from '@scenes/DeleteAccountPage';
import DepositPage from '@scenes/DepositPage';
import ForgotPinPage from '@scenes/ForgotPinPage';
import FundAccountFeedbackPage from '@scenes/FundAccountFeedbackPage';
import IdentityVerificationPage from '@scenes/IdentityVerificationPage';
import IdentityVerifiedSuccessPage from '@scenes/IdentityVerifiedSuccessPage';
import KYCPage from '@scenes/KYCPage';
import LifeChat from '@scenes/LifeChat';
import LovePage from '@scenes/LovePage';
import MorePage from '@scenes/MorePage';
import NotificationsPage from '@scenes/NotificationsPage';
import PasswordPage from '@scenes/PasswordPage';
import ProfilePage from '@scenes/ProfilePage';
import ReferralPage from '@scenes/ReferralPage';
import ResetPinFeedbackPage from '@scenes/ResetPinFeedbackPage';
import SecurityPage from '@scenes/SecurityPage';
import SecurityPinPage from '@scenes/SecurityPinPage';
import SelectCardPage from '@scenes/SelectCardPage';
import SellGiftCardPage from '@scenes/SellGiftCard';
import SellGiftCardTradeFeedbackPage from '@scenes/SellGiftCardTradeFeedbackPage';
import SellGiftCardTradeSummaryPage from '@scenes/SellGiftCardTradeSummaryPage';
import SetNewPinPage from '@scenes/SetNewPinPage';
import SettingPage from '@scenes/SettingPage';
import SupportPage from '@scenes/SupportPage';
import TradeDetailPage from '@scenes/TradeDetailPage';
import TransactionHistoryPage from '@scenes/TransactionHistoryPage';
import VBADetailsPage from '@scenes/VBADetailsPage';
import VBAPage from '@scenes/VBAPage';
import WalletsPage from '@scenes/WalletsPage';
import Withdrawal from '@scenes/Withdrawal';
import WithdrawalFeedbackPage from '@scenes/WithdrawalFeedbackPage';
import WithdrawalUSDTPage from '@scenes/WithdrawalUSDTPage';
import WithdrawalsPage from '@scenes/WithdrawalsPage';
import { useQuery } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { Avatar, Divider, HStack, Pressable, Text, VStack, View } from 'native-base';
import * as React from 'react';
import { FC } from 'react';
import NotificationContainer from '../../NotificationContainer';

const MainStack = createStackNavigator();
const DashboardDrawer = createDrawerNavigator();
const WalletStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const WalletStackScreen: FC = () => {
  return (
    <WalletStack.Navigator initialRouteName="Wallets">
      <WalletStack.Screen
        name="Wallets"
        component={WalletsPage}
        options={{
          headerShown: false,
        }}
      />
    </WalletStack.Navigator>
  );
};

const DashboardBottomTabStack: FC = () => {
  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Home',
          tabBarIconStyle: {
            marginBottom: -18,
          },
          tabBarLabelStyle: {
            marginTop: 10,
            color: 'black',
            width: '100%',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Home focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="HomeTab"
        component={DashboardPage}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Wallets',
          tabBarIconStyle: {
            marginBottom: -18,
          },
          tabBarLabelStyle: {
            marginTop: 10,
            color: 'black',
            width: '100%',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Wallet focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="WalletsTab"
        component={WalletStackScreen}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Calculator',
          tabBarIconStyle: {
            marginBottom: -18,
          },
          tabBarLabelStyle: {
            marginTop: 10,
            color: 'black',
            width: '100%',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Calculator focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="Calculator"
        component={CalculatorPage}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Settings',
          tabBarIconStyle: {
            marginBottom: -18,
          },
          tabBarLabelStyle: {
            marginTop: 10,
            color: 'black',
            width: '100%',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Settings focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="Settings"
        component={SettingPage}
      />
    </Tab.Navigator>
  );
};

function CustomDrawerContent(props: any) {
  const { navigation } = props;
  const { data, isFetching }: any = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await cacheService.get('user');
      return JSON.parse(res);
    },
  });
  // const queryClient = useQueryClient();

  async function handleLogout() {
    await navigation.navigate('LoginBack');
  }

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View flex="2" width={'100%'} height={290} marginTop={-20} position="relative">
          <DrawerTopBG />
          <HStack position="absolute" alignItems="center" bottom="10" py="4" px="5" width="100%">
            <Avatar
              bg="cyan.500"
              borderColor="white"
              borderWidth="1"
              size="9"
              source={{
                uri: data?.image_url,
              }}>
              {data?.username?.[0]}
            </Avatar>
            <VStack px="4">
              <Text fontSize="md" color="white">
                {data?.username}
              </Text>
              <Text fontSize="2xs" fontWeight="light" color="white">
                {data?.email}
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.closeDrawer()} width="7" marginLeft="auto">
              <CloseBtn />
            </Pressable>
          </HStack>
        </View>
        <View p="6" flex="1">
          <Divider bg="#F7F9FB" />
          {[
            {
              name: 'Transaction History',
              link: 'TransactionHistory',
              icon: <TransactionHistory />,
            },
            {
              name: 'Withdrawals',
              link: 'Withdrawals',
              icon: <BuyGiftCardMore />,
            },
            {
              name: 'Accounts',
              link: 'Banks',
              icon: <Bank />,
            },
            {
              name: 'Notifications',
              link: 'Notifications',
              icon: <Notification />,
            },
            {
              name: 'Help & Support',
              link: 'Support',
              icon: <Support />,
            },
            {
              name: 'Show some love',
              link: 'Love',
              icon: <Love />,
            },
          ].map((item, index) => (
            <Pressable key={index} onPress={() => navigation.navigate(item.link)}>
              <HStack py="4" justifyContent="space-between" alignItems="center">
                <HStack justifyContent="space-between" alignItems="center">
                  <View width="5" h="8">
                    {item.icon}
                  </View>
                  <Text fontWeight="light" px="4">
                    {item.name}
                  </Text>
                </HStack>
                <View width="5" h="8">
                  <RightAngle />
                </View>
              </HStack>
              <Divider bg="#F7F9FB" />
            </Pressable>
          ))}
        </View>
        <View p="6" flex="1">
          <Pressable onPress={() => handleLogout()}>
            <HStack py="4" alignItems="center">
              <View width="5" h="8">
                <Logout />
              </View>
              <Text fontWeight="light" px="4">
                Logout
              </Text>
            </HStack>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const DashboardDrawerStack: FC = () => {
  return (
    <DashboardDrawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <DashboardDrawer.Screen
        name="DashboardDrawer"
        component={DashboardBottomTabStack}
        options={{
          headerShown: false,
        }}
      />
    </DashboardDrawer.Navigator>
  );
};

export const MainStackScreen: FC = () => {
  return (
    <NotificationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={DashboardDrawerStack}
          options={{
            headerShown: false,
          }}
        />
        {/* VBA Feature screens start */}
        <MainStack.Screen
          name="VBAPage"
          component={VBAPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="IdentityVerificationPage"
          component={IdentityVerificationPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="IdentityVerifiedSuccessPage"
          component={IdentityVerifiedSuccessPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="VBADetails"
          component={VBADetailsPage}
          options={{
            headerShown: false,
          }}
        />
        {/* VBA Feature screens end */}
        <MainStack.Screen
          name="SellGiftCard"
          component={SellGiftCardPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="SellGiftCardTradeSummaryPage"
          component={SellGiftCardTradeSummaryPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="SellGiftCardTradeFeedbackPage"
          component={SellGiftCardTradeFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyDate"
          component={BuyDatePage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyAirtime"
          component={BuyAirtimePage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Cable"
          component={BuyCablePage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="AddAccount"
          component={AddAccountPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="AddAccountFeedback"
          component={AddAccountFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Withdraw"
          component={Withdrawal}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="WithdrawalUSDT"
          component={WithdrawalUSDTPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="WithdrawalFeedback"
          component={WithdrawalFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Deposit"
          component={DepositPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="SelectCard"
          component={SelectCardPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Cards"
          component={CardPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="TransactionHistory"
          component={TransactionHistoryPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="TradeDetail"
          component={TradeDetailPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Notifications"
          component={NotificationsPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Love"
          component={LovePage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Support"
          component={SupportPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyElectricity"
          component={BuyElectricityPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyWifi"
          component={BuyWifiPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyGiftCard"
          component={BuyGiftCardPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyGiftCardTradeSummaryPage"
          component={BuyGiftCardTradeSummaryPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BuyGiftCardTradeFeedbackPage"
          component={BuyGiftCardTradeFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="FundAccountFeedback"
          component={FundAccountFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="More"
          component={MorePage}
          options={{
            headerShown: false,
          }}
        />

        <MainStack.Screen
          name="Settings"
          component={SettingPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Security"
          component={SecurityPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Password"
          component={PasswordPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Pin"
          component={SecurityPinPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="ChangePin"
          component={ChangePinPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="ResetPin"
          component={ForgotPinPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="ResetPinFeedback"
          component={ResetPinFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Referrals"
          component={ReferralPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Banks"
          component={BanksPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Withdrawals"
          component={WithdrawalsPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="KYC"
          component={KYCPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="LiveChat"
          component={LifeChat}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="DeleteAccount"
          component={DeleteAccountPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="DeleteAccountFeedback"
          component={DeleteAccountFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="BillFeedback"
          component={BillFeedbackPage}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="SetNewPinPage"
          component={SetNewPinPage}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NotificationContainer>
  );
};
