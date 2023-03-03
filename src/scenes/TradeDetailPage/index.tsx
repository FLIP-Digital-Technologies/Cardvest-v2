import { useGetTransaction } from '@api/hooks/useTransactions';
import { ReportAccount } from '@assets/SVG';
import CLoader from '@components/CLoader';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { Money } from '@scenes/DashboardPage';
import { UploadPanel } from '@scenes/SellGiftCard';
import { useQueryClient } from '@tanstack/react-query';
import * as dayjs from 'dayjs';
import { View, Text, VStack, Button, Pressable, Modal, HStack, Image, Link } from 'native-base';
import React, { FC, memo, useState } from 'react';

export const UploadedItems = ({ images }: { images?: Array<string> }) => {
  const [showModal, setShowModal] = useState(false);
  const [showIndModal, setShowIndModal] = useState<any>(false);
  return (
    <React.Fragment>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="500px">
            <Modal.Body>
              <Modal.CloseButton />
              <VStack mt="8" px="2">
                {images?.map((uri: string, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() =>
                        setShowIndModal({
                          uri,
                        })
                      }>
                      <UploadPanel source={uri} showIcon={false} />
                    </Pressable>
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
      )}
      {!!showIndModal && (
        <Modal isOpen={!!showIndModal} onClose={() => setShowIndModal(false)}>
          <Modal.Content maxWidth="500px" minH="400px">
            <Modal.CloseButton />
            <VStack px="2" justifyContent="center" minH="400px" alignItems="center">
              <Image source={showIndModal} alt="image" borderRadius="lg" minH="10" mx="2" w="100%" />
            </VStack>
          </Modal.Content>
        </Modal>
      )}
      <HStack alignItems="center" mx="-4">
        <HStack alignItems="center">
          {[images?.[0], images?.[1], images?.[2], images?.[3]]?.map((uri: string, index: number) => {
            return (
              <Pressable
                key={index}
                onPress={() =>
                  setShowIndModal({
                    uri,
                  })
                }>
                <Image
                  source={{
                    uri,
                  }}
                  alt="image"
                  borderRadius="lg"
                  minH="12"
                  mx="2"
                  w="12"
                />
              </Pressable>
            );
          })}
        </HStack>
        <Pressable onPress={() => setShowModal(true)} backgroundColor="#F7F9FB">
          {/* @ts-ignore */}
          <Text underline> View {images?.length > 4 && `${images?.length - 4} more`}</Text>
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

const TradeDetailPage: FC<{ route: any }> = ({ route }) => {
  const { params = { id: '', transactionData: {}, type: '' } } = route;
  const { id: transaction_reference, transactionData, type } = params;
  const queryClient = useQueryClient();
  const userData: any = queryClient.getQueryData(['user']);
  const { currency } = useCurrency();
  const { data, isFetched } = useGetTransaction({ transaction_reference, type });
  if (!isFetched) return <CLoader />;
  const body = `
Name: ${userData?.firstname} ${userData?.lastname}

Username: ${userData?.username}

Phone Number: ${data?.data?.bill?.phone_no}

To: ${data?.data?.bill?.product}

Paid On: ${dayjs.default(data?.data?.created_at).format('DD/MM/YYYY')} | ${dayjs
    .default(data?.data?.created_at)
    .format('HH:mm:ss')}

Transaction Amount: ${currency} ${Money(transactionData?.amount, currency)}

Payment Method: Bills - NGN

Fees: ₦0.00

Description: ${data?.data?.bill?.product} - ${data?.data?.bill?.note} Purchase

Transaction Reference: ${data?.data?.reference}
`;
  const subject = `I have a complaint about this transaction!`;
  return (
    <BackButtonTitleCenter title="Transaction Details">
      <View mt="5" mb="3">
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
              body={data?.data?.status === 'succeed' ? 'SUCCESSFUL' : data?.data?.status?.toUpperCase()}
              color={
                data?.data?.status === 'pending'
                  ? '#FFCE31'
                  : data?.data?.status.includes('succe')
                  ? '#39A307'
                  : '#FF0000'
              }
            />
          )}
          {data?.data?.payment_status &&
            data?.data?.type.toLowerCase() !== 'bill' &&
            data?.data?.type.toLowerCase() !== 'payout' &&
            data?.data?.type.toLowerCase() !== 'fiat' &&
            data?.data?.type.toLowerCase() !== 'crypto' && (
              <ItemButton
                title="Payment Status"
                body={
                  data?.data?.payment_status === 'succeed' ? 'SUCCESSFUL' : data?.data?.payment_status?.toUpperCase()
                }
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
          {data?.data?.type.toLowerCase() !== 'bill' ? (
            <>
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
              {data?.data?.wallet_address && (
                <ItemText title="Wallet Address" body={data?.data?.wallet_address?.toString() || 'N/A'} />
              )}

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
            </>
          ) : (
            <>
              <ItemText title="Category" body="Bills & Utilities" />
              <ItemText title="Type" body={`${data?.data?.bill?.product} - ${data?.data?.bill?.note}` || 'N/A'} />
              <ItemText title="Amount" body={`${currency} ${Money(transactionData?.amount, currency)}`} />
            </>
          )}
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
        {data?.data?.type.toLowerCase() !== 'bill' ? (
          <TradeDetailPanel title="TRANSACTION FEEDBACK">
            <ItemText title="Admin’s Feedback" body={data?.data?.admin_comment || 'N/A'} />
          </TradeDetailPanel>
        ) : (
          <Link mb="4" href={`mailto:support@cardvest.ng?subject=${subject}\n&body=${body}`}>
            <VStack px="0">
              <HStack>
                <View w="5" h="5">
                  <ReportAccount />
                </View>
                <Text mx="1" fontWeight="600" color="#DC0000">
                  Report Transaction
                </Text>
              </HStack>
              <Text size="xs" fontWeight="200" h="auto" color="#909090">
                Report an issue with this transaction
              </Text>
            </VStack>
          </Link>
        )}
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(TradeDetailPage);
