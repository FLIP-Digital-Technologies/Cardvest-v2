import { Exchange, GHS, NGN, RadioChecked, RadioUnChecked } from '@assets/SVG';
import Input from '@components/Input';
import TransactionPinModal from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { Box, HStack, Text, View, VStack, Select, CheckIcon, Divider, Input as NInput } from 'native-base';
import React, { FC, memo } from 'react';

export const CurrencyPicker = ({ currency, setCurrency }: { currency: string; setCurrency: any }) => (
  <Select
    selectedValue={currency}
    w="98px"
    accessibilityLabel="Choose Currency"
    placeholder=""
    backgroundColor="#F7F2DD"
    fontSize="13"
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
      value="ngn"
      startIcon={
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack w="12" mx="-3" h="7" alignItems="center">
            <NGN />
            <Text> NGN</Text>
          </HStack>
          {currency === 'ngn' ? (
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
      value="ghs"
      startIcon={
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <HStack w="12" mx="-3" h="7" alignItems="center">
            <GHS />
            <Text> GHS</Text>
          </HStack>
          {currency === 'ghs' ? (
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
);

const WithdrawalUSDT: FC = () => {
  const [currency, setCurrency] = React.useState('ngn');
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <BackButtonTitleCenter title="Withdraw USDT" actionText="Proceed" action={() => setModalVisible(true)}>
      <TransactionPinModal {...{ modalVisible, closeModalVisible: () => setModalVisible(false) }} />
      <View my="7">
        <Box position="relative" backgroundColor="#F7F9FB" borderRadius="md" justifyContent="flex-start" mb="10" mt="4">
          <VStack py="8" px="3" w="100%">
            <View>
              <Text color="CARDVESTGREY.50" fontSize="sm">
                Amount
              </Text>
            </View>
            <HStack pb="3" justifyContent={'space-between'}>
              <NInput w="70%" h="60" color="black" fontSize="3xl" value={'1,650,009.89'} variant="unstyled" />
              <CurrencyPicker {...{ currency, setCurrency }} />
            </HStack>
            <View position="relative">
              <Divider my="40px" backgroundColor="#909090" />
              <View h="60px" w="60px" zIndex={9} position="absolute" top="10%" left="43%" right="0%">
                <Exchange />
              </View>
            </View>
            <View>
              <Text color="CARDVESTGREY.50" fontSize="sm">
                USDT Equivalent
              </Text>
            </View>
            <HStack alignItems={'center'}>
              <Text color="black" fontSize="3xl">
                $
              </Text>
              <NInput w="100%" h="60" color="black" fontSize="3xl" value={'1,650,009.89'} variant="unstyled" />
            </HStack>
          </VStack>
        </Box>
        <Input label="USDT Wallet Address" />
        <View p="3" />
        <Input label="Network" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(WithdrawalUSDT);
