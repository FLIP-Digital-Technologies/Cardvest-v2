import { useGetUserWithdrawals } from '@api/hooks/useWallet';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { EmptyPanel, TransDate, TransactionPanel } from '@scenes/DashboardPage';
import { useQueryClient } from '@tanstack/react-query';
import { FlatList, HStack, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const Card = () => {
  return (
    <HStack
      borderRadius="sm"
      py="3"
      px="2"
      my="2"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={'CARDVESTGREY.500'}>
      <HStack alignItems="center">
        <VStack px="2">
          <Text fontSize="md">Dec 25, 2022 | 3:45 PM</Text>
          <Text fontSize="sm" color="CARDVESTGREY.100">
            Your Giftcard sale trade has been processed successfully!
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

const WithdrawalsPage: FC = () => {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading } = useGetUserWithdrawals(currency, page);
  const a = useMemo(() => {
    const b: any = {};
    data?.data?.map((i: any) => {
      // @ts-ignore
      b[i?.created_at?.slice(0, 10)] =
        b[i?.created_at?.slice(0, 10)]?.length > 0 ? [...b[i?.created_at?.slice(0, 10)], i] : [i];
    });
    return b;
  }, [data]);
  if (isLoading) return <CLoader />;
  if (data?.data?.length === 0)
    return (
      <View w="100%" h="full" flex={1} justifyContent={'center'}>
        <EmptyPanel />
      </View>
    );
  return (
    <BackButtonTitleCenter noScroll title="Withdrawal">
      <View w="100%" mb="8" h="full">
        <FlatList
          data={Object.keys(a)}
          renderItem={({ item }) => {
            return (
              <React.Fragment>
                <Text p="2" w="100%" bg="#F9F9F9" my="3" textAlign="center">
                  {TransDate(item)}
                </Text>
                {a[item].map((item: any, ind: number) => (
                  <TransactionPanel currency={currency} data={item} type={'withdrawals'} key={ind} />
                ))}
              </React.Fragment>
            );
          }}
          keyExtractor={(item: any) => item}
          onRefresh={() => queryClient.invalidateQueries([`user-withdrals-${currency}`])}
          refreshing={isFetching}
          onEndReached={data?.meta?.current_page < data?.meta?.last_page ? () => setPage(page + 1) : () => null}
        />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalsPage);
