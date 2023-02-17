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
} from '@api/transactions/transactions';
import {
  TransactionRequestPayload,
  CreateSellOrderRequestPayload,
  CreateBuyOrderRequestPayload,
} from '@api/transactions/types';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetAllBillTransactions(currency: string, page?: number) {
  return useQuery([`transactions-bill-${currency}`, currency, page], () => getAllBillTransactions(currency, page));
}

function useGetAllTransactions(currency: string, page?: number) {
  return useQuery([`transactions-${currency}`, currency, page], () => getAllTransactions(currency, page));
}

function useGetPayoutTransactions(currency: string, page?: number) {
  return useQuery([`payout-transactions-${currency}`, currency, page], () => getPayoutTransactions(currency, page));
}

function useGetTransaction({ transaction_reference, type }: any) {
  return useQuery(
    [`transaction-${transaction_reference}`, { transaction_reference, type }],
    () => getTransaction({ transaction_reference, type }),
    {
      enabled: !!transaction_reference,
    },
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

function usePurchaseElectricity() {
  return useMutation(
    [`purchase-data-plans`],
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
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'giftcard image uploaded successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'giftcard image not uploaded',
        });
      },
    },
  );
}

function usePurchaseWifi() {
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
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'giftcard image uploaded successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'giftcard image not uploaded',
        });
      },
    },
  );
}

function usePurchaseCable() {
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
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'giftcard image uploaded successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'giftcard image not uploaded',
        });
      },
    },
  );
}

function usePurchaseData() {
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
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'giftcard image uploaded successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'giftcard image not uploaded',
        });
      },
    },
  );
}

function useUploadGiftcardImage() {
  return useMutation(['upload-giftImage'], () => uploadGiftcardImage(), {
    onSuccess: (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'giftcard image uploaded successfully',
      });
    },
    onError: (/*data*/) => {
      onOpenToast({
        status: 'error',
        message: 'giftcard image not uploaded',
      });
    },
  });
}

function useCreateSellOrder() {
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['sell-order'],
    ({ card_id, amount, images, to_bank, bank, comment, currency }: CreateSellOrderRequestPayload) =>
      createSellOrder({ card_id, amount, images: ['kjdkjdjkd'], to_bank, bank, comment, currency }),
    {
      onSuccess: (/*data*/) => {
        navigation.navigate('SellGiftCardTradeSummaryPage');
        onOpenToast({
          status: 'success',
          message: 'sell order created successfully',
        });
        navigation.navigate('SellGiftCardTradeFeedbackPage', {
          category: 'card_id',
          giftCard: 'giftCard',
          amountUSD: 'amount',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'sell order not created',
        });
      },
    },
  );
}

function useCreateBuyOrder() {
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['buy-order'],
    ({ card_id, amount, comment, currency }: CreateBuyOrderRequestPayload) =>
      createBuyOrder({ card_id, amount, comment, currency }),
    {
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'buy order created successfully',
        });
        navigation.navigate('BuyGiftCardTradeFeedbackPage', {
          category: 'card_id',
          giftCard: 'giftCard',
          amountUSD: 'amount',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'buy order not created',
        });
      },
    },
  );
}

export {
  useGetAllTransactions,
  useGetPayoutTransactions,
  useUploadGiftcardImage,
  useGetTransaction,
  useCreateSellOrder,
  useCreateBuyOrder,
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
};
