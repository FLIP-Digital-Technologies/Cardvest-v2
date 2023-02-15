import { useGetTransaction } from '@api/hooks/useTransactions';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { Money } from '@scenes/DashboardPage';
import { UploadPanel } from '@scenes/SellGiftCard';
import * as dayjs from 'dayjs';
import { View, Text, VStack, Button, Pressable, Modal, HStack, Image } from 'native-base';
import React, { FC, memo, useState } from 'react';

export const UploadedItems = ({ images }: { images?: Array<string> }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <React.Fragment>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="500px">
          <Modal.Body>
            <Modal.CloseButton />
            <VStack mt="8" px="2">
              {images?.splice(0, 4)?.map((uri: string) => {
                return (
                  <UploadPanel
                    source={{
                      uri,
                    }}
                    showIcon={false}
                    key={uri}
                  />
                );
              })}
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
          {images?.splice(0, 4)?.map((uri: string) => {
            return (
              <Image
                source={{
                  uri,
                }}
                alt="image"
                borderRadius="lg"
                key={uri}
                minH="12"
                mx="2"
                w="12"
              />
            );
          })}
        </HStack>
        {/* @ts-ignore */}
        {images?.length > 4 && (
          <Pressable onPress={() => setShowModal(true)} backgroundColor="#F7F9FB">
            {/* @ts-ignore */}
            <Text underline>{images?.length - 4} more</Text>
          </Pressable>
        )}
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

const TradeDetailPage: FC<{ route: any }> = ({ route }) => {
  const { params = { id: '', transactionData: {}, type: '' } } = route;
  const { id: transaction_reference, transactionData, type } = params;
  const { data, isFetched } = useGetTransaction({ transaction_reference, type });
  const { currency } = useCurrency();
  console.log(data, transactionData, type);
  if (!isFetched) return <CLoader />;
  return (
    <BackButtonTitleCenter title="Transaction Details">
      <View mt="5" mb="20">
        <TradeDetailPanel>
          <ItemText title="Reference" body={data?.data?.reference} />
          <ItemText
            title="Transaction Date"
            body={`${dayjs.default(data?.data?.created_at).format('DD/MM/YYYY')} | ${dayjs
              .default(data?.data?.created_at)
              .format('HH:mm:ss')}`}
          />
          {data?.data?.status && (
            <ItemButton
              title="Status"
              body={data?.data?.status === 'succeed' ? 'successful' : data?.data?.status?.toUpperCase()}
              color={
                data?.data?.status === 'pending'
                  ? '#FFCE31'
                  : data?.data?.status.includes('succe')
                  ? '#39A307'
                  : '#FF0000'
              }
            />
          )}
          {data?.data?.payment_status && data?.data?.type.toLowerCase() !== 'sell' && (
            <ItemButton
              title="Payment Status"
              body={data?.data?.payment_status === 'succeed' ? 'successful' : data?.data?.payment_status?.toUpperCase()}
              color={
                data?.data?.payment_status === 'pending'
                  ? '#FFCE31'
                  : data?.data?.payment_status.includes('succe')
                  ? '#39A307'
                  : '#FF0000'
              }
            />
          )}
          <ItemText
            title="Last Updated"
            body={`${dayjs.default(data?.data?.updated_at).format('DD/MM/YYYY')} | ${dayjs
              .default(data?.data?.updated_at)
              .format('HH:mm:ss')}`}
          />
        </TradeDetailPanel>
        <TradeDetailPanel title="TRANSACTION INFO">
          <ItemButton title="Transaction Type" body={data?.data?.type?.toUpperCase()} color="#39A307" />
          {data?.data?.card && (
            <>
              <ItemText
                title="Gift Card"
                body={`${data?.data?.card?.category_name?.toUpperCase()} / ${data?.data?.card?.name?.toUpperCase()}`}
              />
              <ItemText title="Rate" body={`${data?.data?.card?.rates?.[currency]}/$`} />
            </>
          )}
          {data?.data?.unit >= 0 && <ItemText title="Unit" body={data?.data?.unit?.toString() || 'N/A'} />}

          {data?.data?.bank && (
            <>
              <ItemText title="Account Name" body={`${data?.data?.bank?.accountname}`} />
              <ItemText
                title="Bank Details"
                body={`${data?.data?.bank?.bankname?.toUpperCase()} - ${data?.data?.bank?.banknumber?.toUpperCase()}`}
              />
            </>
          )}
          <ItemText title="Total Amount" body={`${currency} ${Money(data?.data?.amount, currency)}`} />
          <ItemText title="User’s Comment" body={data?.data?.comment || 'N/A'} />
        </TradeDetailPanel>
        {data?.data?.images?.length > 0 && (
          <TradeDetailPanel title="UPLOADED IMAGES">
            {data?.data?.images?.length === 0 ? (
              <ItemText title="Images" body="N/A" />
            ) : (
              <UploadedItems images={data?.data?.images} />
            )}
          </TradeDetailPanel>
        )}
        <TradeDetailPanel title="TRANSACTION FEEDBACK">
          <ItemText title="Admin’s Feedback" body={data?.data?.admin_comment || 'N/A'} />
        </TradeDetailPanel>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(TradeDetailPage);
