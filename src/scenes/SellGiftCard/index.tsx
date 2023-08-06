/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
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
import { FormCurrencyPicker } from '@scenes/WithdrawalUSDTPage';
import { Box, Button, Divider, HStack, Image, Pressable, Text, VStack, View } from 'native-base';
import React, { FC, memo, useMemo, useState } from 'react';

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

const SellGiftCardPage: FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { params = { tradeData: {} } } = route;
  const { tradeData } = params;
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [category, setCategory] = useState<number>(tradeData?.category);
  const [comment, setComment] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [giftCard, setGiftCard] = useState(tradeData?.giftCard);
  const [amountUSD, setAmountUSD] = useState(tradeData?.amountUSD || 0);
  const { data } = useGetAllCategories();
  const { currency, handleSwitchCurrency } = useCurrency();
  const { data: giftCardsData } = useGetGiftcardsToSell({ category_id: Number(category) });
  const card = useMemo(() => {
    if (!giftCard) return;
    return giftCardsData?.data?.filter((card: any) => card.id === giftCard)?.[0];
  }, [giftCard]);
  const total = useMemo(() => {
    if (!card) return;
    const totalAmount = (Number(card?.rate) * amountUSD) / Number(card?.rates[currency]);
    return totalAmount;
  }, [amountUSD, giftCardsData, currency]);
  const handleDisabled = () => !amountUSD || !giftCardsData || !category || selectedImage.length <= 0;
  const handleSubmit = async () => {
    try {
      navigation.navigate('SellGiftCardTradeSummaryPage', {
        sellGiftCard: {
          card,
          category,
          giftCard,
          amountUSD,
          currency,
          images: selectedImage,
          rate: `${currency} ${Money(Number(card?.rates[currency]) || 0, currency)}`,
          total: `${currency} ${Money(total || 0, currency)}`,
          comment,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <BackButtonTitleCenter
      title="Sell Giftcard"
      actionText="Sell Giftcard"
      isDisabled={handleDisabled()}
      action={() => handleSubmit()}>
      <View my="7">
        <Text mx="auto" textAlign="center" fontSize="md" color="CARDVESTGREEN">
          Get the current value for your transaction
        </Text>
        <View p="3" />
        <FormSelect label="Select Category" value={category} setValue={setCategory} data={data?.data} />
        <View p="3" />
        <FormSelect label="Select Giftcard" value={giftCard} setValue={setGiftCard} data={giftCardsData?.data} />
        <View p="3" />
        <Input label="Amount in USD" value={amountUSD} onChangeText={setAmountUSD} />
        <View p="3" />
        <MediaUploader
          formFiles={selectedImage}
          // onInit={() => {}}
          type="card"
          onImageRemoved={filenames => {
            setSelectedImage(filenames);
          }}
          onImageUploaded={filenames => {
            setSelectedImage(filenames);
          }}
          CustomButton={UploadButton}
        />
        {selectedImage.map((image: string, index) => (
          <UploadPanel key={index} source={image} showIcon={false} />
        ))}
        <View p="3" />
        <FormCurrencyPicker label="Payout Currency" setCurrency={handleSwitchCurrency} currency={currency} />
        <View p="3" />
        <HStack justifyContent="space-between" alignItems="flex-end">
          <View w="80%">
            <Input
              label="Promo Code (Optional)"
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
            />
          </View>
          <View pb="2">
            <Button h="51.3px" backgroundColor="CARDVESTGREEN" onPress={() => console.log('hello world')}>
              Apply
            </Button>
          </View>
        </HStack>
        <View p="3" />
        <VStack backgroundColor="#F7F9FB" px="3" py="4" borderRadius="lg">
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Current Rate:</Text>
            <Text color="CARDVESTGREY.100">
              {currency} {Money(Number(card?.rates[currency]) || 0, currency)}
            </Text>
          </HStack>
          <Divider />
          <HStack my="3" justifyContent="space-between">
            <Text color="CARDVESTGREY.100">Total</Text>
            <Text color="black">
              {currency} {Money(total || 0, currency)}
            </Text>
          </HStack>
        </VStack>
        <View p="3" />
        <TextArea label="Comment (Optional)" value={comment} onChangeText={setComment} />
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(SellGiftCardPage);
