import { useMixpanel } from '@MixpanelAnalytics';
import {
  getAllTransactions,
  getPayoutTransactions,
  getTransaction,
  uploadGiftcardImage,
  createSellOrder,
  createBuyOrder,
  getAllDataPlans,
  purchaseDataPlans,
  getAllDataPlansProviders,
  getAllCablePlansProviders,
  getAllCablePlans,
  purchaseCablePlans,
  getAllAirtimeNetworks,
  getAllWifiPlansProviders,
  getAllWifiPlans,
  purchaseWifiPlans,
  getAllElectricityPlansProviders,
  purchaseElectricityToken,
  getAllBillTransactions,
  verifyMeter,
  purchaseAirtime,
} from '@api/transactions/transactions';
import { PurchaseWifiPlanslRequestPayload } from '@api/transactions/types';
import { PurchaseElectricityTokenRequestPayload } from '@api/transactions/types';
import { CreateSellOrderRequestPayload, CreateBuyOrderRequestPayload } from '@api/transactions/types';
import env from '@env';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';
import { Adjust, AdjustEvent } from 'react-native-adjust';

function useElectricityPlansProviders() {
  return useQuery([`electricity-plans-providers`], () => getAllElectricityPlansProviders());
}

function useWifiPlansProviders() {
  return useQuery([`wifi-plans-providers`], () => getAllWifiPlansProviders());
}

function useGetWifiPlans(product: string) {
  return useQuery([`wifi-plans-${product}`, product], () => getAllWifiPlans({ product }));
}

function useAirtimePlansProviders() {
  return useQuery([`airtime-plans-providers`], () => getAllAirtimeNetworks());
}

function useCablePlansProviders() {
  return useQuery([`data-cable-providers`], () => getAllCablePlansProviders());
}

function useGetCablePlans(product: string) {
  return useQuery([`cable-plans-${product}`, product], () => getAllCablePlans({ product }));
}

function useGetDataPlansProviders() {
  return useQuery([`data-plans-providers`], () => getAllDataPlansProviders());
}

function useGetDataPlans(product: string) {
  return useQuery([`data-plans-${product}`, product], () => getAllDataPlans({ product }));
}

function useGetAllBillTransactions(currency: string, page?: number) {
  return useInfiniteQuery(
    [`transactions-bill-${currency}`, currency, page],
    pagination => getAllBillTransactions(currency, pagination),
    {
      getPreviousPageParam: firstPage =>
        firstPage?.meta?.current_page === 1 ? undefined : firstPage?.meta?.current_page - 1,
      getNextPageParam: lastPage =>
        lastPage?.meta?.last_page <= lastPage?.meta?.current_page ? undefined : lastPage?.meta?.current_page + 1,
    },
  );
}

function useGetAllTransactions(currency: string, page?: number) {
  return useInfiniteQuery(
    [`transactions-${currency}`, currency, page],
    pagination => getAllTransactions(currency, pagination),
    {
      getPreviousPageParam: firstPage =>
        firstPage?.meta?.current_page === 1 ? undefined : firstPage?.meta?.current_page - 1,
      getNextPageParam: lastPage =>
        lastPage?.meta?.last_page <= lastPage?.meta?.current_page ? undefined : lastPage?.meta?.current_page + 1,
    },
  );
}

function useGetPayoutTransactions(currency: string, page?: number) {
  return useInfiniteQuery(
    [`payout-transactions-${currency}`, currency, page],
    pagination => getPayoutTransactions(currency, pagination),
    {
      getPreviousPageParam: firstPage =>
        firstPage?.meta?.current_page === 1 ? undefined : firstPage?.meta?.current_page - 1,
      getNextPageParam: lastPage =>
        lastPage?.meta?.last_page <= lastPage?.meta?.current_page ? undefined : lastPage?.meta?.current_page + 1,
    },
  );
}

function useGetTransaction({ transaction_reference, type }: any) {
  return useQuery({
    queryKey: [`transaction-${transaction_reference}-details`, transaction_reference],
    queryFn: () => getTransaction({ transaction_reference, type }),
    // Refetch the data every second
    // Refetch the data every second
    refetchInterval: 1000,
  });
}

function useVerifyMeterElectricity(meter_no: string) {
  return useMutation(
    [`verify-meter-electricity-${meter_no}`],
    ({ product, meter_no, meter_type }: any) =>
      verifyMeter({
        product,
        meter_no,
        meter_type,
      }),
    {
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: 'error fetching meter details',
        });
      },
    },
  );
}

function usePurchaseElectricity() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    [`purchase-electricity-plans`],
    ({
      product,
      meter_no,
      customer_name,
      meter_type,
      phone_no,
      currency,
      amount,
    }: PurchaseElectricityTokenRequestPayload) =>
      purchaseElectricityToken({
        product,
        meter_no,
        customer_name,
        meter_type,
        phone_no,
        currency,
        amount,
      }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Electricity Purchase', {
          ...variables,
        });

        // Firebase Analytics: Buy Electricity Event
        await analytics().logEvent('buy_electricity', {
          user_id: user?.id,
          username: user?.username,
          provider: variables.product,
          meter_type: variables.meter_type,
          amount: variables.amount,
          meter_number: variables.meter_no,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BillFeedback' }],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function usePurchaseWifi() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    [`purchase-data-plans`],
    ({ currency, device_no, product, code, amount }: PurchaseWifiPlanslRequestPayload) =>
      purchaseWifiPlans({
        currency,
        device_no,
        product,
        code,
        amount,
      }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Wifi Purchase', {
          ...variables,
        });

        // Firebase Analytics: Buy Wifi Event
        await analytics().logEvent('buy_wifi', {
          user_id: user?.id,
          username: user?.username,
          provider: variables.product,
          package: variables.code,
          amount: variables.amount,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BillFeedback' }],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function usePurchaseCable() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    [`purchase-data-plans`],
    ({ currency, phone_no, product, code, amount, smart_card_no }: any) =>
      purchaseCablePlans({
        currency,
        phone_no,
        product,
        code,
        amount,
        smart_card_no,
      }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Cable Plan Purchase', {
          ...variables,
        });

        // Firebase Analytics: Buy Cable Event
        await analytics().logEvent('buy_cable', {
          user_id: user?.id,
          username: user?.username,
          provider: variables?.product,
          package: variables?.code,
          amount: variables?.amount,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BillFeedback' }],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function usePurchaseData() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    [`purchase-data-plans`],
    ({ currency, phone_no, product, code, amount }: any) =>
      purchaseDataPlans({
        currency,
        phone_no,
        product,
        code,
        amount,
      }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Data Purchase', {
          ...variables,
        });

        // Firebase Analytics: Buy Data Event
        await analytics().logEvent('buy_data', {
          user_id: user?.id,
          username: user?.username,
          network: variables?.product,
          bundle: variables?.code,
          amount: variables?.amount,
          number: variables?.phone_no,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BillFeedback' }],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function usePurchaseAirtime() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    [`purchase-data-plans`],
    ({ currency, phone_no, product, amount }: any) =>
      purchaseAirtime({
        currency,
        phone_no,
        product,
        amount,
      }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Airtime Purchase', {
          ...variables,
        });

        // Firebase Analytics: Buy Airtime Event
        await analytics().logEvent('buy_airtime', {
          user_id: user?.id,
          username: user?.username,
          network: variables?.product,
          amount: variables?.amount,
          number: variables?.phone_no,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [{ name: 'BillFeedback' }],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}
// function useUploadGiftcardImage() {
//   return useMutation(['upload-giftImage'], () => uploadGiftcardImage(), {
//     onSuccess: (/*data*/) => {
//       onOpenToast({
//         status: 'success',
//         message: 'giftcard image uploaded successfully',
//       });
//     },
//     onError: (/*data*/) => {
//       onOpenToast({
//         status: 'error',
//         message: 'giftcard image not uploaded',
//       });
//     },
//   });
// }

function useCreateSellOrder() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['sell-order'],
    ({ card_id, amount, images, to_bank, bank, comment, currency }: CreateSellOrderRequestPayload) =>
      createSellOrder({ card_id, amount, images, to_bank, bank, comment, currency }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Sell GiftCard', {
          ...variables,
        });

        const adjustEvent = new AdjustEvent(env.ACC_GC_SL);
        adjustEvent.setTransactionId(`${_data?.user_id}-${_data?.id}`);
        adjustEvent.setRevenue(_data?.amount, variables?.currency);
        Adjust.trackEvent(adjustEvent);

        // Firebase Analytics: Sell Giftcard Airtime Event
        await analytics().logEvent('sell_giftcard', {
          user_id: user?.id,
          username: user?.username,
          category: '-',
          giftcard: variables.card_id,
          amount: variables.amount,
          payout_currency: variables.currency,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'SellGiftCardTradeFeedbackPage',
              params: {
                category: 'card_id',
                giftCard: 'giftCard',
                amountUSD: 'amount',
              },
            },
          ],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function useCreateBuyOrder() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['buy-order'],
    ({ card_id, amount, comment, currency }: CreateBuyOrderRequestPayload) =>
      createBuyOrder({ card_id, amount, comment, currency }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track('Buy GiftCard', {
          ...variables,
        });

        const adjustEvent = new AdjustEvent(env.ACC_GC_BY);
        adjustEvent.setTransactionId(`${_data?.user_id}-${_data?.id}`);
        adjustEvent.setRevenue(_data?.amount, variables?.currency);
        Adjust.trackEvent(adjustEvent);

        // Firebase Analytics: Buy Giftcard Airtime Event
        await analytics().logEvent('buy_giftcard', {
          user_id: user?.id,
          username: user?.username,
          category: '-',
          giftcard: variables.card_id,
          amount: variables.amount,
          payout_currency: variables.currency,
        });

        await queryClient.invalidateQueries([`user-${variables?.currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'BuyGiftCardTradeFeedbackPage',
              params: {
                category: 'card_id',
                giftCard: 'giftCard',
                amountUSD: 'amount',
              },
            },
          ],
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

export {
  useGetAllTransactions,
  useGetPayoutTransactions,
  // useUploadGiftcardImage,
  useGetTransaction,
  useCreateSellOrder,
  useCreateBuyOrder,
  usePurchaseAirtime,
  useGetDataPlans,
  usePurchaseData,
  useGetDataPlansProviders,
  useCablePlansProviders,
  useGetCablePlans,
  usePurchaseCable,
  useAirtimePlansProviders,
  useWifiPlansProviders,
  useGetWifiPlans,
  usePurchaseWifi,
  useElectricityPlansProviders,
  usePurchaseElectricity,
  useGetAllBillTransactions,
  useVerifyMeterElectricity,
};
