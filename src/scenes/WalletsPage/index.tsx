import { useGetPayoutTransactions } from '@api/hooks/useTransactions';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BalancePanel, EmptyPanel, TransactionPanel } from '@scenes/DashboardPage';
import { useQuery } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';

const WalletsPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const { data: getWalletData, isFetched } = useGetPayoutTransactions(currency);
  console.log(getWalletData, 'waller');
  if (!isFetched) return <CLoader />;
  return (
    <BackButtonTitleCenter title="Wallets">
      <View mt="4">
        <BalancePanel defaultCurrency={currency} withDeposit={true} />

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
            {getWalletData?.data?.length === 0 ? (
              <EmptyPanel />
            ) : (
              getWalletData?.data?.map((item: any, index: any) => (
                <TransactionPanel data={item} key={index} currency={currency} />
              ))
            )}
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WalletsPage);
