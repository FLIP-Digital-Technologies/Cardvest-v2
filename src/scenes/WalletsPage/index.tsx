import { useGetPayoutTransactions } from '@api/hooks/useTransactions';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BalancePanel, EmptyPanel, TransDate, TransactionPanel } from '@scenes/DashboardPage';
import { BoldText } from '@scenes/LoginPage';
import { HStack, Pressable, Text, View, VStack } from 'native-base';
import React, { FC, memo, useMemo } from 'react';

const WalletsPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency, handleRefreshCurrency } = useCurrency();
  const { data: opps, isFetching } = useGetPayoutTransactions(currency);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setRefreshing(true);
      await handleRefreshCurrency();
      setRefreshing(false);
    } catch (error) {
      console.error('get wallets ', error);
    }
  }, []);
  const getWalletData = useMemo(
    () => ({
      ...opps?.pages[0],
      data: opps?.pages?.flatMap((page, i) => page.data.map((data: any) => data)),
    }),
    [opps],
  );
  const a = useMemo(() => {
    const b: any = {};
    getWalletData?.data?.map((i: any) => {
      // @ts-ignore
      b[i?.created_at?.slice(0, 10)] =
        b[i?.created_at?.slice(0, 10)]?.length > 0 ? [...b[i?.created_at?.slice(0, 10)], i] : [i];
    });
    return b;
  }, [getWalletData]);
  if (isFetching) return <CLoader />;
  return (
    <BackButtonTitleCenter onRefresh={onRefresh} title="Wallets">
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
              <EmptyPanel action={() => navigation.navigate('SellGiftCard')} actionText="Trade Now" />
            ) : (
              Object.keys(a).map((key, index) => {
                return (
                  <React.Fragment key={index}>
                    <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                      {TransDate(key)}
                    </BoldText>
                    {a[key].map((item: any, ind: number) => (
                      <TransactionPanel currency={currency} data={item} type={'cards'} key={ind} />
                    ))}
                  </React.Fragment>
                );
              })
            )}
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WalletsPage);
