/* eslint-disable react/no-unstable-nested-components */
import {
  CloseBtn,
  DrawerTopBG,
  Love,
  Notification,
  RightAngle,
  Support,
  TransactionHistory,
  Card,
  Logout,
  Home,
  Wallet,
  Calculator,
  Settings,
} from '@assets/SVG';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import AddAccountFeedbackPage from '@scenes/AddAccountFeedbackPage';
import AddAccountPage from '@scenes/AddAccountPage';
import BuyAirtimePage from '@scenes/BuyAirtimePage';
import BuyCablePage from '@scenes/BuyCablePage';
import BuyDatePage from '@scenes/BuyDatePage';
import CalculatorPage from '@scenes/CalculatorPage';
import CardPage from '@scenes/CardPage';
import DashboardPage from '@scenes/DashboardPage';
import DepositPage from '@scenes/DepositPage';
import FundAccountFeedbackPage from '@scenes/FundAccountFeedbackPage';
import Homepage from '@scenes/Homepage';
import LovePage from '@scenes/LovePage';
import NotificationsPage from '@scenes/NotificationsPage';
import SelectCardPage from '@scenes/SelectCardPage';
import SellGiftCardPage from '@scenes/SellGiftCardPage';
import SupportPage from '@scenes/SupportPage';
import TransactionHistoryPage from '@scenes/TransactionHistoryPage';
import UserDetails from '@scenes/UserDetails';
import UsersList from '@scenes/UsersList';
import WalletsPage from '@scenes/WalletsPage';
import Withdrawal from '@scenes/Withdrawal';
import WithdrawalFeedbackPage from '@scenes/WithdrawalFeedbackPage';
import WithdrawalUSDTPage from '@scenes/WithdrawalUSDTPage';
import customTheme from '@theme';
import { View, Flex, Icon, ScrollView, Text, Avatar, VStack, HStack, Pressable, Divider } from 'native-base';
import { FC } from 'react';
import * as React from 'react';

const MainStack = createStackNavigator();
const DashboardDrawer = createDrawerNavigator();
const WalletStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

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
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: 'black',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Home focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="Dashboard"
        component={DashboardPage}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Wallets',
          tabBarLabelStyle: {
            color: 'black',
          },
          tabBarIcon: ({ focused }) => (
            <React.Fragment>
              <View w="7" h="7" m="1">
                <Wallet focused={focused} />
              </View>
            </React.Fragment>
          ),
        }}
        name="Wallets"
        component={WalletStackScreen}
      />
      <Tab.Screen
        options={{
          header: () => null,
          tabBarLabel: 'Calculator',
          tabBarLabelStyle: {
            color: 'black',
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
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            color: 'black',
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
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

function CustomDrawerContent(props: any) {
  const { navigation } = props;

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
                uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              }}>
              TE
            </Avatar>
            <VStack px="4">
              <Text fontSize="md" color="white">
                Kenny Michael
              </Text>
              <Text fontSize="2xs" fontWeight="light" color="white">
                kennymichael@gmail.com
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
              name: 'Cards',
              link: 'Cards',
              icon: <Card />,
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
          <Pressable>
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
    <DashboardDrawer.Navigator initialRouteName="Dashboard" drawerContent={props => <CustomDrawerContent {...props} />}>
      <DashboardDrawer.Screen
        name="Dashboard"
        component={DashboardBottomTabStack}
        options={{
          headerShown: false,
        }}
      />
      <DashboardDrawer.Screen name="Home" component={HomeScreen} />
    </DashboardDrawer.Navigator>
  );
};

export const MainStackScreen: FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Dashboard">
      <MainStack.Screen
        name="Dashboard"
        component={DashboardDrawerStack}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="SellGiftCard"
        component={SellGiftCardPage}
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
        name="FundAccountFeedback"
        component={FundAccountFeedbackPage}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UsersList"
        component={UsersList}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: customTheme.space[5],
          },
          headerRightContainerStyle: {
            paddingRight: customTheme.space[5],
          },
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};
