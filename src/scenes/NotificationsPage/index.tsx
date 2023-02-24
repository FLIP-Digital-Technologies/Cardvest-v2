import { useGetNotification } from '@api/hooks/useUser';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { EmptyPanel } from '@scenes/DashboardPage';
import { useQueryClient } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import { FlatList, HStack, Text, VStack, View } from 'native-base';
import React, { FC, memo, useState } from 'react';

const Card = ({ data }: { data: any }) => {
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
          <Text fontSize="md">
            {dayjs.default(data?.created_at).format('DD/MM/YYYY')} |{' '}
            {dayjs.default(data?.created_at).format('HH:mm:ss')}
          </Text>
          <Text fontSize="sm" color="CARDVESTGREY.100">
            {data?.description}
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
};

const NotificationsPage: FC = () => {
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading } = useGetNotification();
  const [page, setPage] = useState(1);
  console.log(data);
  if (isLoading) return <CLoader />;
  return (
    <BackButtonTitleCenter title="Notifications">
      <VStack my="7">
        {data?.data?.length === 0 ? (
          <View w="100%" h="full" justifyContent={'center'}>
            <EmptyPanel title="No Notifications" body="New updates will appear here." />
          </View>
        ) : (
          <FlatList
            data={data?.data}
            renderItem={({ item }) => <Card data={item} />}
            keyExtractor={(item: any) => item?.id}
            onRefresh={() => queryClient.invalidateQueries([`user-notifications`])}
            refreshing={isFetching}
            onEndReached={data?.meta?.current_page < data?.meta?.last_page ? () => setPage(page + 1) : () => null}
          />
        )}
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(NotificationsPage);
