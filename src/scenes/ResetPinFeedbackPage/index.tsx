import { Mail } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const Reset: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          padding: '20px',
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
            A PIN reset link has been sent to k**********l@gmail.com
          </Text>
        </Center>
        <View mt="10" />
        <Center>
          <Button
            onPress={() => navigation.navigate('Pin')}
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

export default memo(Reset);
