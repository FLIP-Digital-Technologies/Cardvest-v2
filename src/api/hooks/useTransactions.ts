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
import { CreateSellOrderRequestPayload, CreateBuyOrderRequestPayload } from '@api/transactions/types';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

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
  return useQuery([`transaction-${transaction_reference}-details`, transaction_reference], () =>
    getTransaction({ transaction_reference, type }),
  );
}

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
      onError: (/*data*/) => {
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
  return useMutation(
    [`purchase-electricity-plans`],
    ({ product, meter_no, customer_name, meter_type, phone_no, currency, amount }: any) =>
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
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
        });
      },
    },
  );
}

function usePurchaseWifi() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation(
    [`purchase-data-plans`],
    ({ currency, device_no, product, code, amount }: any) =>
      purchaseWifiPlans({
        currency,
        device_no,
        product,
        code,
        amount,
      }),
    {
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
        });
      },
    },
  );
}

function usePurchaseCable() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
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
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
        });
      },
    },
  );
}

function usePurchaseData() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
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
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
        });
      },
    },
  );
}

function usePurchaseAirtime() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
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
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
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
  return useMutation(
    ['sell-order'],
    ({ card_id, amount, images, to_bank, bank, comment, currency }: CreateSellOrderRequestPayload) =>
      createSellOrder({ card_id, amount, images, to_bank, bank, comment, currency }),
    {
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message: data?.response?.data?.message || 'An error occurred',
        });
      },
    },
  );
}

function useCreateBuyOrder() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  return useMutation(
    ['buy-order'],
    ({ card_id, amount, comment, currency }: CreateBuyOrderRequestPayload) =>
      createBuyOrder({ card_id, amount, comment, currency }),
    {
      onSuccess: async (data, variables) => {
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
      onError: data => {
        onOpenToast({
          status: 'error',
          message:
            `${data?.response?.data?.message} ${data?.b && data?.b}` ||
            data?.response?.data?.message ||
            'An error occurred',
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
