import { useMixpanel } from '@MixpanelAnalytics';
import { createCryptoTransaction, getAvailableCoins } from '@api/crypto';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetAvailableCrypto({ currency }: { currency: string }) {
  return useQuery([`crypto-coins-${currency}`], () => getAvailableCoins({ currency }));
}

function useCreateBuyTransaction() {
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();

  return useMutation(['create-crypto-sell-transaction'], payload => createCryptoTransaction(payload), {
    onSuccess: async (data: any, variables: any) => {
      mixpanel.track('create-crypto-transaction');

      // Firebase Analytics
      await analytics().logEvent('crypto_sell_transaction_created', {
        user_id: data?.data?.user?.id,
        ...variables?.payload,
      });

      navigation.navigate('SellCryptoPaymentPage');
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

function useGetKYCLevel() {
  // return useQuery([`crypto-coins-${currency}`], () => getAvailableCoins({ currency }));
}

export { useGetAvailableCrypto, useCreateBuyTransaction, useGetKYCLevel };
