import { useGetAllTransactions } from '@api/hooks/useTransactions';
import CLoader from '@components/CLoader';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel, TransDate, TransactionPanel } from '@scenes/DashboardPage';
import { BoldText } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { FlatList, View } from 'native-base';
import React, { useMemo, useState } from 'react';

const GiftcardHistory = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const queryClient = useQueryClient();
  const [page] = useState(1);
  const { data: opps, isFetching, isLoading, fetchNextPage } = useGetAllTransactions(currency, page);
  const getTrancationData = useMemo(
    () => ({
      ...opps?.pages[page - 1],
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
  if (isLoading) return <CLoader />;
  if (getTrancationData?.data?.length === 0)
    return (
      <View w="100%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel action={() => navigation.navigate('SellGiftCard')} actionText="Trade Now" />
      </View>
    );
  return (
    <View w="100%" mb="8" h="full">
      <FlatList
        data={Object.keys(a)}
        renderItem={({ item }) => {
          return (
            <React.Fragment>
              <BoldText p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                {TransDate(item)}
              </BoldText>
              {a[item].map((item: any, ind: number) => (
                <TransactionPanel currency={currency} data={item} type={'cards'} key={ind} />
              ))}
            </React.Fragment>
          );
        }}
        keyExtractor={(item: any) => item}
        onRefresh={() => queryClient.invalidateQueries([`transactions-${currency}`])}
        refreshing={isFetching}
        onEndReached={
          getTrancationData?.meta?.current_page < getTrancationData?.meta?.last_page
            ? () => fetchNextPage()
            : () => null
        }
      />
    </View>
  );
};

export default GiftcardHistory;
