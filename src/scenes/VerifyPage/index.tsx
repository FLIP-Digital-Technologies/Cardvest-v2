import { Mail } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Button, Box, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';

const Verify: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { params = { email: '' } } = route;
  const { email } = params;
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
            Verify Your Email
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            A verification email has been sent to {email} Check to verify your Cardvest Account.
          </Text>
        </Center>
        <View mt="10" />
        <Center px="4">
          <Button
            onPress={() => navigation.navigate('SetTransactionPin')}
            my="3"
            width="95%"
            size="lg"
            _text={{
              width: '150%',
            }}
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

export default memo(Verify);
