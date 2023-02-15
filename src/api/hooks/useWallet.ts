import { fundWallet, getCurrencyWallet, getDefaultWallet, switchDefaultWallet } from '@api/wallets/wallet';
import { getAllWithdrawals, initiateWithdrawal } from '@api/withdrawals/withdrawals';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetUserWithdrawals(currency: string, page: any) {
  return useQuery([`user-withdrals-${currency}`, { currency, page }], () => getAllWithdrawals(currency, page));
}

function useGetUserDefaultWallet() {
  return useQuery([`user-default-wallet`], () => getDefaultWallet());
}

function useGetUserCurrencyWallet(currency: string, token?: string) {
  return useQuery([`user-${currency}-wallet`, currency], () => getCurrencyWallet(currency));
}

function useInitializeWithdrawal() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['init-withdrawal'],
    ({ amount, bank, currency, type, wallet_address }: any) =>
      initiateWithdrawal({ amount, bank, currency, type, wallet_address }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
        // queryClient.invalidateQueries({ queryKey: [`user-${currency}-wallet`] })
        onOpenToast({
          status: 'success',
          message: 'Funds withdrawn successfully',
        });
        navigation.navigate('WithdrawalFeedback');
      },
      onError: (data: any) => {
        onOpenToast({
          status: 'error',
          message: data?.response?.data?.message || 'An error has occurred when withdrawing funds',
        });
      },
    },
  );
}

function useSwitchDefaultWallet() {
  const queryClient = useQueryClient();
  return useMutation(['switch-wallet'], (currency: string) => switchDefaultWallet({ currency }), {
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
      // queryClient.invalidateQueries({ queryKey: [`user-${currency}-wallet`] })
      onOpenToast({
        status: 'success',
        message: 'Default Wallet switched successfully',
      });
    },
    onError: (/*data*/) => {
      onOpenToast({
        status: 'error',
        message: 'An error has occurred when switching default wallet',
      });
    },
  });
}

function useFundWallet() {
  const queryClient = useQueryClient();
  return useMutation(
    ['fund-wallet'],
    ({ currency, amount }: { currency: string; amount: any }) => fundWallet({ currency, amount }),
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
        // queryClient.invalidateQueries({ queryKey: [`user-${currency}-wallet`] })
        onOpenToast({
          status: 'success',
          message: 'Fund Wallet successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'An error has occurred when funding wallet',
        });
      },
    },
  );
}

export {
  useGetUserWithdrawals,
  useGetUserDefaultWallet,
  useGetUserCurrencyWallet,
  useSwitchDefaultWallet,
  useFundWallet,
  useInitializeWithdrawal,
};
