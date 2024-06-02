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

const cryptoTradeData: CryptoTradeData = {
  id: 127416,
  reference: 'CVR40JIR8QPI',
  type: 'sell-crypto',
  amount: 216000,
  unit: 444.44444444444446,
  status: 'pending',
  created_at: '2024-06-02T01:22:01.000000Z',
  coin: 'ADA (BEP20)',
  payable_amount: 444.44444444444446,
  rate: 0.45,
  usd_amount: 200,
  payment_details: {
    id: 3999631,
    minimumAmount: 0.49275503,
    address: '0x04CdcEdd0D042969fcf5d37198747ee69E8421ec',
    rate: 0.451791,
    expDate: '2024-06-02T01:52:01.0615683Z',
    qrCode:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAAC5CAYAAAB0rZ5cAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAABCRJREFUeJzt3VFu2zgUQNG6mP1v2d2AChBDlqRuzvmP7TgXBF4oUZ/v9/v9BWG/T38A+NdETp7IyRM5eSInT+TkiZw8kZMncvJETp7IyRM5eSInT+TkiZw8kZMncvJETp7Iyftv9Qt+Pp/VL/m/rb59dfXvNvP5Zj7L0/uW/25WcvJETp7IyRM5ecsHzyc7zi/aMTiNDmyjv+/oZ356vdXvMfq+q+34u1nJyRM5eSInT+TkbRk8n5waiFa/76lDgWcG3tXvO+rUd2UlJ0/k5ImcPJGTd2zwvMnoTuaOoev2y2DfyEpOnsjJEzl5IifP4PkXMwPgzM+uvnTXY1qt5PwAIidP5OSJnLxjg+ftA9HoELdjN3Jm4F3t9r/bEys5eSInT+TkiZy8LYOnS0WfzRxWdGoH9Y2s5OSJnDyRkydy8j7fN25hTbjpctTVn+WmndGbWMnJEzl5IidP5OQtHzxvukT11BB3apfx1Gm/o5xqC/+IyMkTOXkiJ++VhwudGmBWXxq7+vEsq3c8Vx+w9GTHDrSVnDyRkydy8kRO3lWHC+3YLV091OwYRmeG1tHHwsx8LzcNmU+s5OSJnDyRkydy8pYPnjt2yVb/7GqrdxRXD3YzBxPNvO8pVnLyRE6eyMkTOXmv3PF8ctMzNk8NgDft5t7ESk6eyMkTOXkiJ2/54DkzmOwYdE693o6BbcfwPePU92IlJ0/k5ImcPJGTd9Wltqtf76ZTXlf/Hjfdp3nTPbdPrOTkiZw8kZMncvJeeartk5t2VZ/cNMiOvt6MU7uqT6zk5ImcPJGTJ3LytgyeO3Yeb7r38PYd3h3f6U1/Nys5eSInT+TkiZy8Lfd4PrnpEtodBxiNOvX9rT4QafV3OsNKTp7IyRM5eSIn79iO58zAsWNY2XEI0ajVg+Kp+0NX/+woKzl5IidP5OSJnLyr7vG8/dLYU481mXmPmWF01E0n+z6xkpMncvJETp7IybvqOZ5PdlwCeuqZok9uOpRn1O2f2UpOnsjJEzl5Iifv8z21zXjI7btz5Xtkd7zeEys5eSInT+TkiZy8Y4cL7TCzuzljxy7tqc88+rOjXGoLC4icPJGTJ3Lyrn+cyqjV92mO/uzqS3dvfxTL6s9ixxMWEDl5IidP5OQdu8fz9l2yUauH0dH3mLH69W76ezyxkpMncvJETp7IybvqVNs3mtndvGlgu/0+zRlWcvJETp7IyRM5eQbPX3vuZRx9vdWX6Z763Ua5xxMWEDl5IidP5ORd/ziVU+976vLWHafGjrr9MSmjrOTkiZw8kZMncvK2DJ43DStvHMROHRC0+tTdU/9ssJKTJ3LyRE6eyMn7cc/x5OexkpMncvJETp7IyRM5eSInT+TkiZw8kZMncvJETp7IyRM5eSInT+TkiZw8kZMncvJETt4fDVwcjii6C6QAAAAASUVORK5CYII=',
  },
};

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
