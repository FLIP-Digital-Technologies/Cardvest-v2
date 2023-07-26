import { useMixpanel } from '@MixpanelAnalytics';
import {
  createBuyTransaction,
  getAllBuyGiftCardCategories,
  getAllCategories,
  getCountries,
  getGiftcard,
  getGiftcardsByCountry,
  getGiftcardsToBuy,
  getGiftcardsToSell,
} from '@api/giftcards/giftcards';
import { GiftCardsToBuyRequestPayload, GiftCardsToSellRequestPayload } from '@api/giftcards/types';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetAllBuyCategories() {
  return useQuery([`giftcard-buy-categories`], () => getAllBuyGiftCardCategories());
}

function useGetAllCategories() {
  return useQuery([`giftcard-categories`], () => getAllCategories());
}

function useGetGiftcardsToBuy({ category_id }: GiftCardsToBuyRequestPayload) {
  return useQuery([`giftcard-buy-${category_id}`, { category_id }], () => getGiftcardsToBuy({ category_id }), {
    enabled: !!category_id,
  });
}

function useGetGiftcardsToSell({ category_id }: GiftCardsToSellRequestPayload) {
  return useQuery([`giftcard-sell-${category_id}`, { category_id }], () => getGiftcardsToSell({ category_id }), {
    enabled: !!category_id,
  });
}

function useGetGiftcardDetails({ card_id }: any) {
  return useQuery([`giftcard-${card_id}`, { card_id }], () => getGiftcard({ card_id }));
}

function useGetGiftcardCountries() {
  return useQuery([`giftcard-countries`], () => getCountries());
}

function useGetGiftcardsByCountry(country: string, enabled: boolean) {
  return useQuery({
    queryKey: [`giftcard-countries-${country}`],
    queryFn: () => getGiftcardsByCountry(country),
    enabled,
  });
}

function useCreateBuyTransaction() {
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();
  return useMutation(['verify-bvn'], payload => createBuyTransaction(payload), {
    onSuccess: async (data: any, variables: any) => {
      mixpanel.track('create-giftcard-buy-transaction');

      // Firebase Analytics
      await analytics().logEvent('giftcard_buy_transaction_created', {
        user_id: data?.data?.user?.id,
        ...variables?.payload,
      });

      navigation.navigate('TransactionProcessing');
    },

    onError: (data: any) => {
      console.log('ERROR DATA: ', data);

      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'Transaction failed.',
      });
    },
  });
}
export {
  useCreateBuyTransaction,
  useGetAllBuyCategories,
  useGetAllCategories,
  useGetGiftcardCountries,
  useGetGiftcardDetails,
  useGetGiftcardsByCountry,
  useGetGiftcardsToBuy,
  useGetGiftcardsToSell,
};
