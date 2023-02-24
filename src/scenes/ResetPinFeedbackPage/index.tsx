import { Mail } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useQueryClient } from '@tanstack/react-query';
import { View, Text, Center, Button, Box, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const ResetPinFeedbackPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData(['user']);
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center>
          <Box width={120} height={120}>
            <Mail />
          </Box>
          <Text mt="4" color="CARDVESTGREEN" textAlign="center" fontSize="3xl" fontWeight="medium">
            Reset PIN
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            A PIN reset link has been sent to {data?.email}
          </Text>
        </Center>
        <View mt="10" />
        <Center>
          <Button
            onPress={() => navigation.navigate('SetNewPinPage')}
            my="3"
            width="100%"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Continue
          </Button>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(ResetPinFeedbackPage);
