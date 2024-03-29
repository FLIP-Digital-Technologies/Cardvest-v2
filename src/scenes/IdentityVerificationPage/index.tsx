import { useVerifyBVN } from '@api/hooks/useBankAccounts';
import { QMarkAsset, ShieldAsset } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';
import { Button, HStack, Pressable, Text, VStack, View } from 'native-base';
import React, { useState } from 'react';
import { Modal } from 'react-native';

export default function IdentityVerificationPage() {
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData(['user']);

  const { mutate: verifyBVN, isLoading } = useVerifyBVN();

  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bvn, setBVN] = useState('');

  const handleDisabled = () => !firstName || !lastName || !bvn;

  const handleVerifyBvn = async () => {
    try {
      if (userData) {
        if (userData?.firstname !== firstName) throw new Error("Entered first name doesn't match user's firstname");
        if (userData?.lastname !== lastName) throw new Error("Entered last name doesn't match user's last name");
      }
      await verifyBVN({
        firstName,
        lastName,
        bvn,
      });
    } catch (e) {
      onOpenToast({
        status: 'error',
        message: `Error: ${e}`,
      });
    }
  };

  const onOpen = () => {
    setShowModal(true);
  };
  return (
    <BackButtonTitleCenter title="Identity Verification">
      <View flex={1}>
        <VStack space={5} flex={1} mt={10}>
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
              <HStack space={1} justifyContent={'center'}>
                <Button variant="link" onPress={onOpen}>
                  <HStack space={1}>
                    <QMarkAsset />
                    <Text textAlign="center" color={'#235643'}>
                      Why do you need my BVN?
                    </Text>
                  </HStack>
                </Button>
              </HStack>
            </View>
          </View>
          <Button
            onPress={handleVerifyBvn}
            isLoading={isLoading}
            isLoadingText="Verifying"
            my="3"
            size="lg"
            py="4"
            opacity={handleDisabled() ? 50 : 100}
            disabled={handleDisabled()}
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Verify KYC
          </Button>
          {/* <View h={55} mt="auto" mb={5}>
            <Pressable
              flex={1}
              borderRadius="lg"
              justifyContent="center"
              borderColor={'#235643'}
              borderWidth={1}
              opacity={handleDisabled() ? 50 : 100}
              isDisabled={handleDisabled()}
              backgroundColor={'#235643'}>
              <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
                <Text textAlign={'center'} px="1" color="white">
                  Verify KYC
                </Text>
              </HStack>
            </Pressable>
          </View> */}
        </VStack>

        <Modal animationType="slide" transparent visible={showModal} onRequestClose={() => setShowModal(false)}>
          <Pressable flex={1} h="100%" backgroundColor="rgba(0,0,0,.2)" onPress={() => setShowModal(false)}>
            <Pressable
              onPress={e => e.stopPropagation()}
              backgroundColor={'white'}
              mt="auto"
              p={10}
              borderTopRadius={20}>
              <View>
                <VStack space={5} h="auto">
                  <ShieldAsset />
                  <View flexDirection={'row'}>
                    <Text color={'#235643'} fontSize={'lg'}>
                      Why do you need my BVN?
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Your BVN is required for compliance purposes, to increase your withdrawal limit, and for you to
                      have access to more features e.g a virtual bank account.
                    </Text>
                  </View>
                  <View>
                    <Text>
                      Please note that your BVN is never shared and it does not give us access to your bank account.
                      Your details are safe with us.
                    </Text>
                  </View>
                  <View h={55} mt="auto" mb={5}>
                    <Pressable
                      flex={1}
                      onPress={() => setShowModal(false)}
                      borderRadius="lg"
                      justifyContent="center"
                      borderColor={'#235643'}
                      borderWidth={1}
                      backgroundColor={'#235643'}>
                      <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
                        <Text textAlign={'center'} px="1" color="white">
                          Continue
                        </Text>
                      </HStack>
                    </Pressable>
                  </View>
                </VStack>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </BackButtonTitleCenter>
  );
}
