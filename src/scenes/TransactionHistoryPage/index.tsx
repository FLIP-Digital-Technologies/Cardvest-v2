/* eslint-disable react-hooks/rules-of-hooks */
import { BackButton } from '@assets/SVG';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel, TransactionPanel } from '@scenes/DashboardPage';
import { Box, Center, useColorModeValue, Pressable, Text, View, ScrollView, HStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const arr: string[] = ['', '', ''];

const FirstRoute = () => (
  <ScrollView
    _contentContainerStyle={{
      flexGrow: 1,
    }}
    w="90%"
    my="8">
    {/* // TODO: make into a flatlist */}
    {arr.length === 0 ? <EmptyPanel /> : arr.map((item: any) => <TransactionPanel />)}
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView
    _contentContainerStyle={{
      flexGrow: 1,
    }}
    w="90%"
    my="8">
    {/* // TODO: make into a flatlist */}
    {arr.length === 0 ? <EmptyPanel /> : arr.map((item: any) => <TransactionPanel />)}
  </ScrollView>
);

const ThirdRoute = () => (
  <ScrollView
    _contentContainerStyle={{
      flexGrow: 1,
    }}
    w="90%"
    my="8">
    {/* // TODO: make into a flatlist */}
    {arr.length === 0 ? <EmptyPanel /> : arr.map((item: any) => <TransactionPanel />)}
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const TransactionHistoryPage: FC<{ route: any }> = ({ route }) => {
  const { tab } = route.params;
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
            <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3">
              <Pressable
                onPress={() => {
                  console.log(i);
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
