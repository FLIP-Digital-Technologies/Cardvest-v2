import { WalletAsset } from '@assets/SVG';
import { useNavigation } from '@react-navigation/native';
import { Button, HStack, Pressable, Text, VStack, View } from 'native-base';
import React from 'react';

export default function InsufficientFundsErrorPage() {
  const navigation = useNavigation();
  return (
    <VStack justifyContent={'center'} alignItems={'center'} flex={1} space={3}>
      <WalletAsset />
      <Text fontSize="2xl" color="">
        Insufficient Funds!
      </Text>
      <Text color={'gray.400'} w="75%" textAlign={'center'}>
        Ooops! We were unable to process your purchase because of insufficient funds in your wallet. Kindly fund your
        wallet and try again.
      </Text>
      <View mx="5" pt="5">
        <HStack w="100%">
          <Pressable
            flex={1}
            onPress={() => null}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'#235643'}
            borderWidth={1}
            backgroundColor={'#235643'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                Fund Wallet
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </View>
      <View>
        <HStack space={1} justifyContent={'center'}>
          <Button variant="link" onPress={() => navigation.navigate('Home' as any)}>
            <HStack space={1}>
              <Text textAlign="center" color={'#235643'} borderBottomWidth={1} borderColor={'#235643'}>
                Go to Dashboard
              </Text>
            </HStack>
          </Button>
        </HStack>
      </View>
    </VStack>
  );
}
