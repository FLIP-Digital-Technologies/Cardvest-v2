import { useGetAllCategories, useGetGiftcardsToSell } from '@api/hooks/useGiftcards';
import { Camera, RedTrash, Uploading } from '@assets/SVG';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import MediaUploader from '@components/Upload/MediaUploader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { FormSelect } from '@scenes/CalculatorPage';
import { Money } from '@scenes/DashboardPage';
import { SelectComponent } from '@scenes/SignUpPage';
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Box, Button, Divider, Flex, HStack, Image, Pressable, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';
import { SelectItemOption } from 'types';

export const UploadPanel = ({
  canDelete = true,
  showIcon = true,
  source,
}: {
  canDelete?: boolean;
  showIcon?: boolean;
  source?: any;
}) => {
  return (
    <HStack my="3" alignItems="center" justifyContent="space-between">
      <HStack alignItems="center">
        <Image src={source} alt="image" borderRadius="lg" h="12" w="12" mr="3" />
        {source.length > 0 && <Text underline>{source?.split('gift-cards/')?.[1]}</Text>}
      </HStack>
      {showIcon && (
        <React.Fragment>
          {canDelete ? (
            <View w="5" h="7">
              <RedTrash />
            </View>
          ) : (
            <View w="16" h="7">
              <Uploading />
            </View>
          )}
        </React.Fragment>
      )}
    </HStack>
  );
};

export const UploadButton = ({ label, onPress, imgs }: { label: string; onPress: any; imgs?: any }) => {
  return (
    <React.Fragment>
      <Box my="2">
        {(label || onPress) && (
          <Text mb="2" color="CARDVESTGREY.400">
            {label || 'Upload Giftcard Image'}
          </Text>
        )}
        <Pressable onPress={() => onPress()} py="4" px="1" backgroundColor="#F7F9FB">
          <HStack alignItems="center">
            <View w="10" h="4">
              <Camera />
            </View>
            <Text underline color="CARDVESTGREEN">
              Upload images here
            </Text>
          </HStack>
        </Pressable>
        <Text mt="2" fontWeight="light" color="#BABABA" fontSize="xs">
          You can upload multiple valid images at once
        </Text>
      </Box>
    </React.Fragment>
  );
};

const SellCryptoPage: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const params = route.params;

  const handleSubmit = async () => {
    try {
      // navigation.navigate();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <BackButtonTitleCenter title="USDT Wallet" isDisabled={false} action={() => handleSubmit()}>
      <Flex flexDirection={'column'} my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>

        <View p="3" />
        <Text mx="auto" textAlign="center" fontSize="md" color="black">
          Send USDT to your address and it will be automatically converted to NAIRA or CEDIS depending on the preferred
          payout wallet, and based on the current rate.
        </Text>

        <Text mx="auto" mt={16} fontWeight="black" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Please send all USDT via the BEP20 network.
        </Text>

        <Button my="3" size="lg" p="4" fontSize="md" backgroundColor="#eeeeee" color="white">
          <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
            Tap to scan QR code
          </Text>
        </Button>

        <Button my="3" size="lg" p="4" fontSize="md" backgroundColor="#eeeeee" color="white">
          <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
            0x2966930143c8c460971,,,
          </Text>
        </Button>

        <Flex flexGrow={1} mt={24} justifyContent={'flex-end'}>
          <Button my="3" size="lg" p="4" fontSize="md" backgroundColor="#FAC915" color="black">
            <Text fontSize={'md'}>Check Rates</Text>
          </Button>
        </Flex>
      </Flex>
    </BackButtonTitleCenter>
  );
};

export default memo(SellCryptoPage);
