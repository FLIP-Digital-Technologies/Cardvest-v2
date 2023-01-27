import { Exchange, GHS, NGN, RadioChecked, RadioUnChecked } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, HStack, Text, View, VStack, Select, CheckIcon, Divider, Input as NInput } from 'native-base';
import React, { FC, memo } from 'react';

const DepositPage: FC = () => {
  const [currency, setCurrency] = React.useState('NGN');
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Fund Wallet" actionText="Continue" action={() => navigation.navigate('SelectCard')}>
      <View my="7">
        <View p="5" />
        <Text w="75%" mx="auto" textAlign="center" fontSize="md">
          How much do you want to add to your {currency?.toUpperCase()} wallet?
        </Text>
        <View p="5" />
        <Select
          selectedValue={currency}
          w="100%"
          h="12"
          accessibilityLabel="Choose Currency"
          placeholder=""
          backgroundColor="#FFF"
          fontSize="15"
          borderColor="#F7F9FB"
          _selectedItem={{
            bg: '#F7F2DD',
          }}
          mt={1}
          onValueChange={itemValue => setCurrency(itemValue)}>
          <Select.Item
            isDisabled
            label="Select Wallet"
            value="non"
            _disabled={{ opacity: 1 }}
            startIcon={
              <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="CARDVESTGREEN">
                  Select Wallet
                </Text>
              </HStack>
            }
          />
          <Select.Item
            label="NGN"
            value="NGN"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <NGN />
                  <Text> NGN</Text>
                </HStack>
                {currency === 'NGN' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
          <Select.Item
            label="GHS"
            value="GHS"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <GHS />
                  <Text> GHS</Text>
                </HStack>
                {currency === 'GHS' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
        </Select>
        <Input
          placeholder="Enter Amount"
          fontWeight="md"
          color="black"
          InputRightElement={
            <View h="50px" p="3" justifyContent="center" style={{ backgroundColor: '#F7F9FB' }}>
              <Text>{currency?.toUpperCase()}</Text>
            </View>
          }
        />
        <View p="3" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(DepositPage);
