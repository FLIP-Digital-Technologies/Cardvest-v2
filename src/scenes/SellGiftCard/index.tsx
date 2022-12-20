import { Camera, Pic, RedTrash, Uploading } from '@assets/SVG';
import Input from '@components/Input';
import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Box, HStack, Text, View, VStack, Divider, Button, Pressable, Modal, Image } from 'native-base';
import React, { FC, memo, useState } from 'react';

export const UploadPanel = ({ canDelete = true, showIcon = true }: { canDelete?: boolean; showIcon?: boolean }) => {
  return (
    <HStack my="3" alignItems="center" justifyContent="space-between">
      <HStack alignItems="center">
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          }}
          alt="image"
          borderRadius="lg"
          minH="12"
          w="12"
        />
        <Text underline> Cardimg.jpg</Text>
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

export const UploadButton = ({ label }: { label: string }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.Body>
            <Modal.CloseButton />
            <VStack mt="8" px="2">
              <Pressable mx="4" py="10" my="4" borderRadius="lg" borderWidth="1" borderStyle="dashed">
                <VStack alignItems="center">
                  <View w="7" h="7">
                    <Pic />
                  </View>
                  <Text>Browse Images to upload</Text>
                </VStack>
              </Pressable>
              <UploadPanel canDelete={true} />
              <UploadPanel canDelete={true} />
              <UploadPanel canDelete={true} />
              <UploadPanel canDelete={false} />
              <View mt="20" />
              <VStack>
                <Button
                  onPress={() => setShowModal(false)}
                  my="3"
                  size="lg"
                  p="4"
                  fontSize="md"
                  backgroundColor="CARDVESTGREEN"
                  color="white">
                  Continue
                </Button>
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Box my="2">
        {label && (
          <Text mb="2" color="CARDVESTGREY.400">
            {label}
          </Text>
        )}
        <Pressable onPress={() => setShowModal(true)} py="4" px="1" backgroundColor="#F7F9FB">
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

const SellGiftCardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter
      title="Sell Giftcard"
      actionText="Sell Giftcard"
      action={() => navigation.navigate('SellGiftCardTradeSummaryPage')}>
      <View my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>
        <View p="3" />
        <Input label="Select Category" />
        <View p="3" />
        <Input label="Select Giftcard" />
        <View p="3" />
        <Input label="Amount in USD" />
        <View p="3" />
        <UploadButton label="Upload Giftcard Image" />
        <View p="3" />
        <Input label="Payout Currency" />
        <View p="3" />
        <HStack justifyContent="space-between" alignItems="flex-end">
          <View w="80%">
            <Input label="Promo Code (Optional)" placeholder="Enter promo code" />
          </View>
          <View pb="2">
            <Button py="3" backgroundColor="CARDVESTGREEN" onPress={() => console.log('hello world')}>
              Apply
            </Button>
          </View>
        </HStack>
        <View p="3" />
        <VStack backgroundColor="#F7F9FB" px="3" py="4" borderRadius="lg">
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Current Rate:</Text>
            <Text color="CARDVESTGREY.100">NGN 400</Text>
          </HStack>
          <Divider />
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Total</Text>
            <Text color="black">NGN 400,000</Text>
          </HStack>
        </VStack>
        <View p="3" />
        <TextArea label="Comment (Optional)" />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(SellGiftCardPage);
