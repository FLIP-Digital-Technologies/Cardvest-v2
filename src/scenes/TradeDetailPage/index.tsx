import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { UploadPanel } from '@scenes/SellGiftCard';
import { View, Text, VStack, Button, Pressable, Modal, Box, HStack, Image } from 'native-base';
import React, { FC, memo, useState } from 'react';

export const UploadedItems = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.Body>
            <Modal.CloseButton />
            <VStack mt="8" px="2">
              <UploadPanel showIcon={false} />
              <UploadPanel showIcon={false} />
              <UploadPanel showIcon={false} />
              <UploadPanel showIcon={false} />
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
                  Close
                </Button>
              </VStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <HStack alignItems="center" mx="-4">
        <HStack alignItems="center">
          {['', '', '', '', '', '', ''].splice(0, 4).map(() => {
            return (
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                }}
                alt="image"
                borderRadius="lg"
                minH="12"
                mx="2"
                w="12"
              />
            );
          })}
        </HStack>
        <Pressable onPress={() => setShowModal(true)} backgroundColor="#F7F9FB">
          <Text underline>2 more</Text>
        </Pressable>
      </HStack>
    </React.Fragment>
  );
};

const TagIndicator = ({ text, color }: { text: string; color: string }) => {
  return (
    <VStack alignItems="flex-start">
      <Button px="7" py="2" borderColor={color} borderWidth="1" borderRadius="lg" textAlign="center">
        <Text color={color}>{text}</Text>
      </Button>
    </VStack>
  );
};

const ItemText = ({ body, title }: { body: string; title: string }) => {
  return (
    <VStack my="2">
      <Text my="1" color="CARDVESTGREY.50">
        {title}
      </Text>
      <Text my="1" color="CARDVESTGREY.900">
        {body}
      </Text>
    </VStack>
  );
};

const ItemButton = ({ body, color, title }: { body: string; color: string; title: string }) => {
  return (
    <VStack my="2">
      <Text my="1" color="CARDVESTGREY.50">
        {title}
      </Text>
      <TagIndicator text={body} color={color} />
    </VStack>
  );
};

export const TradeDetailPanel = ({ title, children }: { children: React.ReactNode; title?: string }) => {
  return (
    <React.Fragment>
      {title && (
        <Text mt="2" color="CARDVESTGREEN">
          {title}
        </Text>
      )}
      <VStack my="2" backgroundColor="CARDVESTGREY.500" py="4" px="6">
        {children}
      </VStack>
      <View p="3" />
    </React.Fragment>
  );
};

const TradeDetailPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Transaction Details">
      <View mt="9" mb="20">
        <TradeDetailPanel>
          <ItemText title="Reference" body="CVTKCWCQE8BRISEL" />
          <ItemText title="Transaction Date" body="08/10/2022 | 08:11:48" />
          <ItemButton title="Status" body="Successful" color="#39A307" />
          <ItemText title="Last Updated" body="08/10/2022 | 08:53:15" />
        </TradeDetailPanel>
        <TradeDetailPanel title="TRANSACTION INFO">
          <ItemButton title="Transaction Type" body="BUY" color="#39A307" />
          <ItemText title="Gift Card" body="iTunes / Apple USA physical / 100-200 only" />
          <ItemText title="Rate" body="415/$" />
          <ItemText title="Unit" body="1000" />
          <ItemText title="Total Amount" body="3,850,000" />
          <ItemText title="User’s Comment" body="NIL" />
        </TradeDetailPanel>
        <TradeDetailPanel title="UPLOADED IMAGES">
          <UploadedItems />
        </TradeDetailPanel>
        <TradeDetailPanel title="TRANSACTION FEEDBACK">
          <ItemText title="Admin’s Feedback" body="NIL" />
        </TradeDetailPanel>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(TradeDetailPage);
