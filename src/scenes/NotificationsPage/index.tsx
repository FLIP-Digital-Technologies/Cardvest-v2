import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel } from '@scenes/DashboardPage';
import { HStack, Text, VStack } from 'native-base';
import React, { FC, memo } from 'react';

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

const NotificationsPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const arr: string[] = ['', '', '', '', '', '', ''];
  return (
    <BackButtonTitleCenter title="Notifications">
      <VStack my="7">{arr.length === 0 ? <EmptyPanel /> : arr.map((item: any) => <Card />)}</VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(NotificationsPage);
