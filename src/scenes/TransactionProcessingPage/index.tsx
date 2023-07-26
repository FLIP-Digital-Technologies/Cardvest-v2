import { SuccessAsset } from '@assets/SVG';
import { useNavigation } from '@react-navigation/native';
import { HStack, Pressable, Text, VStack, View } from 'native-base';
import React from 'react';
import 'react-native';

export default function TransactionProcessingPage() {
  const navigation = useNavigation();
  return (
    <VStack justifyContent={'center'} alignItems={'center'} flex={1}>
      <SuccessAsset />
      <Text fontSize="2xl" color="">
        Transaction Processing
      </Text>
      <Text color={'gray.400'} w="60%" textAlign={'center'}>
        Your transaction has been submitted, and is being processed.
      </Text>
      <View mx="5" pt="10">
        <HStack w="100%">
          <Pressable
            flex={1}
            onPress={() => navigation.navigate('Home' as any)}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'#235643'}
            borderWidth={1}
            backgroundColor={'#235643'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                Go to Dashboard
              </Text>
            </HStack>
          </Pressable>
        </HStack>
      </View>
    </VStack>
  );
}
