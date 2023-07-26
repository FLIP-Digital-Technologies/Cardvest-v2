import { VBAImageAsset } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { HStack, Pressable, Text, VStack, View } from 'native-base';
import React, { useState } from 'react';

const points = [
  'Get a unique virtual bank account for easy wallet funding.',
  'Requesting takes less than 5 minutes.',
  'It’s free of charge.',
];

const VBAPage = ({ navigation }: any) => {
  // const navigation = useNavigation();
  const [KYCVerified] = useState(false);
  return (
    <BackButtonTitleCenter noScroll title="Fund Wallet">
      <View h="190px" my="5">
        <VBAImageAsset />
      </View>
      <View flex={1}>
        <VStack space={3}>
          <Text fontSize="3xl">The Cardvest Virtual Bank Account</Text>
          <View>
            {points.map((point, i) => (
              <HStack space={2} key={i}>
                <Text>{'\u2022'}</Text>
                <Text>{point}</Text>
              </HStack>
            ))}
          </View>
        </VStack>
        <VStack mt="auto" pb={5} space={7}>
          {!KYCVerified && (
            <Text color="gray.400">To create your virtual bank account, we need some information about you.</Text>
          )}
          <View h={55}>
            <Pressable
              flex={1}
              onPress={() => navigation.navigate(KYCVerified ? 'AccountDetailsPage' : 'IdentityVerificationPage')}
              borderRadius="lg"
              justifyContent="center"
              borderColor={'#235643'}
              borderWidth={1}
              backgroundColor={'#235643'}>
              <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
                <Text textAlign={'center'} px="1" color="white">
                  {KYCVerified ? 'Request Virtual Account' : 'Verify KYC'}
                </Text>
              </HStack>
            </Pressable>
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
};

export default VBAPage;
