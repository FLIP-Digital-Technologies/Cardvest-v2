import { useMixpanel } from '@MixpanelAnalytics';
import { fundWallet, getCurrencyWallet, getDefaultWallet, switchDefaultWallet } from '@api/wallets/wallet';
import {
  getAllWithdrawals,
  getWithdrawalsUSDTNetwork,
  getWithdrawalsUSDTRate,
  initiateWithdrawal,
} from '@api/withdrawals/withdrawals';
import env from '@env';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';
import { Adjust, AdjustEvent } from 'react-native-adjust';

function useGetUserWithdrawals(currency: string, page: any) {
  return useInfiniteQuery(
    [`user-withdrals-${currency}`, { currency, page }],
    pagination => getAllWithdrawals(currency, pagination),
    {
      getPreviousPageParam: firstPage =>
        firstPage?.meta?.current_page === 1 ? undefined : firstPage?.meta?.current_page - 1,
      getNextPageParam: lastPage =>
        lastPage?.meta?.last_page <= lastPage?.meta?.current_page ? undefined : lastPage?.meta?.current_page + 1,
    },
  );
}

function useGetUserDefaultWallet() {
  return useQuery([`user-default-wallet`], () => getDefaultWallet());
}

function useGetUserCurrencyWallet(currency: string, token?: string) {
  return useQuery([`user-${currency}-wallet`, currency], () => getCurrencyWallet(currency));
}

function useGetWithdrawalsUSDTNetwork() {
  return useQuery([`withdrawal-usdt-network`], () => getWithdrawalsUSDTNetwork());
}

function useGetWithdrawalsUSDTRate(currency: string) {
  return useQuery([`withdrawal-usdt-${currency}-rate`, currency], () => getWithdrawalsUSDTRate({ currency }));
}

function useInitializeWithdrawal() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['init-withdrawal'],
    ({ amount, bank, currency, type, wallet_address, network }: any) =>
      initiateWithdrawal({ amount, bank, currency, type, wallet_address, network }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track(`Withdraw to ${variables.type === 'fiat' ? 'Fiat' : 'Crypto'}`, {
          ...variables,
        });

        const adjustEvent = new AdjustEvent(env.ACC_FN_WI);
        adjustEvent.setTransactionId(`${variables.type}-${_data?.id}`);
        adjustEvent.setRevenue(_data?.amount, variables?.currency);
        Adjust.trackEvent(adjustEvent);

        await queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
        await queryClient.invalidateQueries({ queryKey: [`user-${variables?.currency}-wallet`] });
        await queryClient.invalidateQueries([`transactions-bill-${variables?.currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`transactions-${variables?.currency}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variables?.currency}`]);
        navigation.navigate('WithdrawalFeedback');
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b
            ? `${data?.b}`
            : data?.response?.data?.message || 'An error has occurred when withdrawing funds',
        });
      },
    },
  );
}

function useSwitchDefaultWallet() {
  const queryClient = useQueryClient();
  return useMutation(['switch-wallet'], (currency: string) => switchDefaultWallet({ currency }), {
    onSuccess: async (_data: any, variable) => {
      await queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
      await queryClient.invalidateQueries({ queryKey: [`user-${variable}-wallet`] });
      await queryClient.invalidateQueries([`transactions-bill-${variable}`]);
      await queryClient.invalidateQueries([`payout-transactions-${variable}`]);
      await queryClient.invalidateQueries([`transactions-${variable}`]);
      await queryClient.invalidateQueries([`user-withdrals-${variable}`]);
      onOpenToast({
        status: 'success',
        message: 'Default Wallet switched successfully',
      });
    },
    onError: (data: any) => {
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: 'An error has occurred when switching default wallet',
      });
    },
  });
}

function useFundWallet() {
  const queryClient = useQueryClient();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['fund-wallet'],
    ({ currency, amount }: { currency: string; amount: any }) => fundWallet({ currency, amount }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        mixpanel.track(`Fund ${variables.currency} Wallet`, {
          ...variables,
        });
        await queryClient.invalidateQueries({ queryKey: ['user-default-wallet'] });
        await queryClient.invalidateQueries({ queryKey: [`user-${variable?.currency}-wallet`] });
        await queryClient.invalidateQueries([`transactions-bill-${variable}`]);
        await queryClient.invalidateQueries([`payout-transactions-${variable}`]);
        await queryClient.invalidateQueries([`transactions-${variable}`]);
        await queryClient.invalidateQueries([`user-withdrals-${variable}`]);
        onOpenToast({
          status: 'success',
          message: 'Fund Wallet successfully',
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
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
  useGetWithdrawalsUSDTNetwork,
  useGetWithdrawalsUSDTRate,
};
