import { useGetAllCategories, useGetGiftcardsToSell } from '@api/hooks/useGiftcards';
import { Camera, RedTrash, Uploading } from '@assets/SVG';
import CopyIcon from '@assets/SVG/copy-icon';
import QRCodeIcon from '@assets/SVG/qrcode-icon';
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
import { Box, Button, Divider, Flex, HStack, Icon, Image, Modal, Pressable, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';
import { SelectItemOption } from 'types';

const SellCryptoPage: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const params = route.params;

  // states
  const [showQRCode, setShowQRCode] = useState(false);
  const [showRates, setShowRates] = useState(false);

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

        <Button
          my="3"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="#eeeeee"
          color="white"
          onPress={() => setShowQRCode(true)}>
          <HStack space={4} alignItems={'center'}>
            <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
              Tap to scan QR code
            </Text>
            <QRCodeIcon />
          </HStack>
        </Button>

        <Button my="3" size="lg" p="4" fontSize="md" backgroundColor="#eeeeee" color="white">
          <HStack space={'4'}>
            <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
              0x2966930143c8c460971,,,
            </Text>
            <CopyIcon />
          </HStack>
        </Button>

        <Flex flexGrow={1} mt={24} justifyContent={'flex-end'}>
          <Button
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="#FAC915"
            color="black"
            onPress={() => setShowRates(true)}>
            <Text fontSize={'md'}>Check Rates</Text>
          </Button>

          <Button
            backgroundColor={'CARDVESTGREEN'}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            color="black"
            onPress={() => navigation.navigate('SellCryptoFeedbackPage')}>
            I have sent the coin
          </Button>
        </Flex>
      </Flex>

      <Modal isOpen={showQRCode} onClose={() => setShowQRCode(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Scan QR code to send USDT</Modal.Header>
          <Modal.Body p={8}>
            <View height={200} mt={4} backgroundColor={'gray.300'} />
          </Modal.Body>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showRates} onClose={() => setShowRates(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Crypto Rates</Modal.Header>
          <Modal.Body>
            <Text fontSize={'md'}>Here is the list of the available crypto rates</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </BackButtonTitleCenter>
  );
};

export default memo(SellCryptoPage);
