import { CryptoTradeData } from '@api/crypto/types';
import { useCopyToClipboard } from '@api/hooks/useCopyToClipboard';
import CopyIcon from '@assets/SVG/copy-icon';
import QRCodeIcon from '@assets/SVG/qrcode-icon';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { onOpenToast } from '@utils/toast';
import { Button, Flex, HStack, Image, Modal, Text, View } from 'native-base';
import React, { FC, memo, useState } from 'react';
import { Pressable } from 'react-native';

const SellCryptoPage: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const tradeDetails = route.params as CryptoTradeData;

  // states
  const [showQRCode, setShowQRCode] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleSubmit = async () => {
    try {
      // navigation.navigate();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <BackButtonTitleCenter title={`${tradeDetails.coin} Wallet`} isDisabled={false} action={() => handleSubmit()}>
      <Flex flexDirection={'column'} my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>

        <View p="3" />
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Send <Text fontWeight={'bold'}>{tradeDetails.coin}</Text> to your address and it will be automatically
          converted to NAIRA or CEDIS depending on the preferred payout wallet, and based on the current rate.
        </Text>

        <Text mx="auto" mt={16} fontWeight="black" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Please send{' '}
          <Text underline fontStyle={'italic'}>
            {tradeDetails.payable_amount}
          </Text>{' '}
          {tradeDetails.coin} to the wallet below. Please include the necessary fee.
        </Text>

        <Pressable
          onPress={() => {
            Clipboard.setString(`${tradeDetails.payable_amount}`);
            onOpenToast({
              status: 'success',
              message: 'Address copied to clipboard',
            });
          }}>
          <HStack justifyContent={'center'} my={'4'}>
            <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
              Copy Amount{' '}
            </Text>
            <CopyIcon />
          </HStack>
        </Pressable>

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

        <Button
          my="3"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="#eeeeee"
          color="white"
          onPress={() => {
            Clipboard.setString(tradeDetails.payment_details.address);
            onOpenToast({
              status: 'success',
              message: 'Address copied to clipboard',
            });
          }}>
          <HStack space={'4'}>
            <Text fontSize={'md'} textAlign={'center'} color={'CARDVESTGREEN'}>
              {tradeDetails.payment_details.address.substring(0, 30)}...
            </Text>
            <CopyIcon />
          </HStack>
        </Button>

        <Flex flexGrow={1} mt={24} justifyContent={'flex-end'}>
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
            <Image src={tradeDetails.payment_details.qrCode} size={'2xl'} />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </BackButtonTitleCenter>
  );
};

export default memo(SellCryptoPage);
