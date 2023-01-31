import {
  getAllTransactions,
  getPayoutTransactions,
  getTransaction,
  uploadGiftcardImage,
  createSellOrder,
  createBuyOrder,
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

function useGetAllTransactions(currency: string, page?: number) {
  return useQuery([`transactions-${currency}`, currency, page], () => getAllTransactions(currency, page));
}

function useGetPayoutTransactions(currency: string, page?: number) {
  return useQuery([`payout-transactions-${currency}`, currency, page], () => getPayoutTransactions(currency, page));
}

function useGetTransaction({ transaction_reference }: TransactionRequestPayload) {
  return useQuery(
    [`transaction-${transaction_reference}`, { transaction_reference }],
    () => getTransaction({ transaction_reference }),
    {
      enabled: !!transaction_reference,
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
    ({ card_id, amount, images, to_bank, bank, comment }: CreateSellOrderRequestPayload) =>
      createSellOrder({ card_id, amount, images: ['kjdkjdjkd'], to_bank, bank, comment }),
    {
      onSuccess: (/*data*/) => {
        navigation.navigate('SellGiftCardTradeSummaryPage');
        onOpenToast({
          status: 'success',
          message: 'sell order created successfully',
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
        navigation.navigate('BuyGiftCardTradeSummaryPage', {
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
};
