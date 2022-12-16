import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BalancePanel, EmptyPanel, TransactionPanel } from '@scenes/DashboardPage';
import { HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';

const WalletsPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [currency, setCurrency] = React.useState('ngn');
  const arr: string[] = ['', '', ''];
  return (
    <BackButtonTitleCenter title="Wallets">
      <View mt="4">
        <BalancePanel withDeposit={true} {...{ currency, setCurrency }} />

        <VStack my="5">
          <View>
            <HStack mb="4" justifyContent="space-between">
              <Text>Recent Transactions</Text>
              <Pressable onPress={() => navigation.navigate('TransactionHistory', { tab: 1 })}>
                <Text underline color="green.900">
                  Show All
                </Text>
              </Pressable>
            </HStack>
            {/* // TODO: make into a flatlist */}
            {arr.length === 0 ? <EmptyPanel /> : arr.map(item => <TransactionPanel />)}
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WalletsPage);
