import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import {
  Checkbox,
  ChevronDownIcon,
  ChevronUpIcon,
  HStack,
  IconButton,
  Input,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import React, { FC, memo, useState } from 'react';

const CalculateGiftcardPricePage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();

  const [quantity, setQuantity] = useState(1);
  const addQty = () => setQuantity(prev => prev + 1);
  const reduceQty = () => setQuantity(prev => prev - 1);

  const handleDisabled = () => true;

  return (
    <BackButtonTitleCenter noScroll title="iTunes US">
      <Text color="CARDVESTGREY.100" textAlign={'center'} w="85%" mx="auto">
        Go to apple.com/redeem to add to your Apple Account balance
      </Text>
      <VStack space={5} my="5" flex={1}>
        <View borderRadius={15} p="5" backgroundColor={'gray.100'}>
          <VStack space={5}>
            <VStack space={3} pb={3} borderBottomColor={'CARDVESTGREEN'} borderBottomWidth={1} borderStyle={'dashed'}>
              <HStack alignItems={'center'} space={3}>
                <Text color="CARDVESTGREEN" flex={1}>
                  Card Unit:
                </Text>
                <Input backgroundColor={'white'} flex={1} />
                <View flex={1} />
              </HStack>
              <HStack alignItems={'center'} space={3}>
                <Text color="CARDVESTGREEN" flex={1}>
                  Quantity:
                </Text>
                <Input backgroundColor={'white'} value={`${quantity}`} flex={1} />
                <HStack flex={1} space={3}>
                  <IconButton
                    variant="solid"
                    size={'sm'}
                    backgroundColor={'CARDVESTGREEN'}
                    color="white"
                    borderRadius={'full'}
                    icon={<ChevronUpIcon color="white" />}
                  />
                  <IconButton
                    variant="solid"
                    size={'sm'}
                    backgroundColor={'CARDVESTGREEN'}
                    color="white"
                    borderRadius={'full'}
                    icon={<ChevronDownIcon color="white" />}
                  />
                </HStack>
              </HStack>
            </VStack>
            <HStack alignItems={'center'} space={3}>
              <Text color="CARDVESTGREEN" flex={1}>
                Total Price:
              </Text>
              <Text color="CARDVESTGREEN" flex={1}>
                N2,000.00
              </Text>
              <View flex={1} />
            </HStack>
          </VStack>
        </View>
        <HStack space={3}>
          <Checkbox
            colorScheme={'green'}
            value="test"
            accessibilityLabel="Checkbox for agreeing to terms and conditions"
            defaultIsChecked
          />
          <Text color="CARDVESTGREEN">Agree to Terms and Conditions</Text>
        </HStack>
        <View h={55} mt="auto" mb={5}>
          <Pressable
            disabled={handleDisabled()}
            opacity={handleDisabled() ? 70 : 100}
            flex={1}
            onPress={() => navigation.navigate('InsufficientFundsErrorPage' as any)}
            borderRadius="lg"
            justifyContent="center"
            borderColor={'CARDVESTGREEN'}
            borderWidth={1}
            backgroundColor={'CARDVESTGREEN'}>
            <HStack p="4" mx="auto" justifyContent="center" alignItems="center">
              <Text textAlign={'center'} px="1" color="white">
                Proceed to payment
              </Text>
            </HStack>
          </Pressable>
        </View>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(CalculateGiftcardPricePage);
