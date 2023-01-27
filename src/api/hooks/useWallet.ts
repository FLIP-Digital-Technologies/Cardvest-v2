import { getCurrencyWallet, getDefaultWallet, switchDefaultWallet } from '@api/wallets/wallet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useGetUserDefaultWallet() {
  return useQuery([`user-default-wallet`], () => getDefaultWallet());
}

function useGetUserCurrencyWallet(currency: string) {
  return useQuery([`user-${currency}-wallet`], () => getCurrencyWallet(currency));
}

function useSwitchDefaultWallet() {
  const queryClient = useQueryClient();
  return useMutation(['switch-wallet'], (currency: string) => switchDefaultWallet({ currency }), {
    onSuccess: (data: any) => {
      console.log('Switch default', data);
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

export { useGetUserDefaultWallet, useGetUserCurrencyWallet, useSwitchDefaultWallet };
