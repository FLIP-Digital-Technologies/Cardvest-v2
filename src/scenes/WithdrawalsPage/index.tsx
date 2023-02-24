import { useGetUserWithdrawals } from '@api/hooks/useWallet';
import { WithdrawalEmpty } from '@assets/SVG';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { EmptyPanel, TransDate, TransactionPanel } from '@scenes/DashboardPage';
import { useQueryClient } from '@tanstack/react-query';
import { FlatList, HStack, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

const WithdrawalsPage: FC = () => {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const [page] = useState(1);
  const { data: opps, isFetching, isLoading, fetchNextPage } = useGetUserWithdrawals(currency, page);
  const data = useMemo(
    () => ({
      ...opps?.pages[page - 1],
      data: opps?.pages?.flatMap((page, i) => page.data.map(data => data)),
    }),
    [opps],
  );
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
  return (
    <BackButtonTitleCenter noScroll title="Withdrawal">
      <View w="100%" mb="8" h="full">
        {data?.data?.length === 0 ? (
          <View justifyContent="center" alignItems="center" h="60%">
            <EmptyPanel
              Icon={WithdrawalEmpty}
              title=""
              body="You haven not made any withdrawal. Trade now to earn instantly."
            />
          </View>
        ) : (
          <FlatList
            data={Object.keys(a)}
            renderItem={({ item }) => {
              return (
                <React.Fragment>
                  <Text p="2" w="100%" bg="#F9F9F9" my="3" fontWeight="700" textAlign="center">
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
            onEndReached={data?.meta?.current_page < data?.meta?.last_page ? () => fetchNextPage() : () => null}
          />
        )}
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalsPage);
