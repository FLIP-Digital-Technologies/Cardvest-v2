import { QMarkAsset } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { Button, HStack, Pressable, Text, VStack, View } from 'native-base';
import React, { useState } from 'react';

export default function IdentityVerificationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bvn, setBVN] = useState('');
  return (
    <BackButtonTitleCenter noScroll title="Identity Verification">
      <View flex={1}>
        <VStack space={5} flex={1}>
          <Text textAlign="center">
            Please provide some information about yourself. We use this information to protect your account, and for
            compliance purposes.
          </Text>
          <Text textAlign="center">The full name must be as shown on your BVN.</Text>
          <View>
            <Input label="First Name" onChangeText={setFirstName} value={firstName} />
            <Input label="Last Name" onChangeText={setLastName} value={lastName} />
            <Input label="Bank Verification Number (BVN)" onChangeText={setBVN} value={bvn} keyboardType="numeric" />
            <View mb={10}>
              <Button variant="link">
                <HStack space={1}>
                  <QMarkAsset />
                  <Text textAlign="center" color={'#235643'}>
                    Why do you need my BVN?
                  </Text>
                </HStack>
              </Button>
            </View>
          </View>
          <View h={55} mt="auto" mb={5}>
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
                  Verify KYC
                </Text>
              </HStack>
            </Pressable>
          </View>
        </VStack>
      </View>
    </BackButtonTitleCenter>
  );
}
