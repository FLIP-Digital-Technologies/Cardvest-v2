import { useMixpanel } from '@MixpanelAnalytics';
import { createCryptoTransaction, getAllCryptoTransactions, getAvailableCoins } from '@api/crypto';
import { CryptoTradeData, CryptoTransactionResponse, SellCryptoPayload } from '@api/crypto/types';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetAllCryptoTransactions(currency: string, page?: number) {
  return useInfiniteQuery(
    [`transactions-crypto-${currency}`, currency, page],
    pagination => getAllCryptoTransactions(currency, pagination),
    {
      getPreviousPageParam: firstPage =>
        firstPage?.meta?.current_page === 1 ? undefined : firstPage?.meta?.current_page - 1,
      getNextPageParam: lastPage =>
        lastPage?.meta?.last_page <= lastPage?.meta?.current_page ? undefined : lastPage?.meta?.current_page + 1,
    },
  );
}

function useGetAvailableCrypto({ currency }: { currency: string }) {
  return useQuery([`crypto-coins-${currency}`], () => getAvailableCoins({ currency }));
}

function useCreateCryptoTransaction() {
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();

  return useMutation<CryptoTradeData, any, SellCryptoPayload>(
    ['create-crypto-sell-transaction'],
    payload => createCryptoTransaction(payload),
    {
      onSuccess: async (data: CryptoTradeData, variables: any) => {
        mixpanel.track('create-crypto-transaction');

        navigation.navigate('SellCryptoPaymentPage', data);
      },

      onError: (data: any) => {
        console.log('ERROR DATA: ', data);

        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'Transaction failed.',
        });
      },
    },
  );
}

export { useGetAvailableCrypto, useCreateCryptoTransaction, useGetAllCryptoTransactions };
