import { useGetUserCurrencyWallet, useSwitchDefaultWallet } from '@api/hooks/useWallet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

export const useCurrency = () => {
  const [currency, setCurrency] = useState('NGN');
  const { data, isFetching } = useGetUserCurrencyWallet(currency);
  const queryClient = useQueryClient();
  const { data: ans } = useQuery([`user-currency`], async () => await cacheService.get('defaultCurrency'));
  useLayoutEffect(() => {
    const fetchDefaultCurrency = async () => {
      const response = await cacheService.get('defaultCurrency');
      await queryClient.setQueryData([`user-currency`], response || 'NGN');
      return setCurrency(response || 'NGN');
    };

    fetchDefaultCurrency();
  }, [currency]);

  const mutation = useMutation(
    [`user-currency`],
    async (newCurrency: string) => await cacheService.put('defaultCurrency', newCurrency),
  );
  const handleSwitchCurrency = useCallback(
    async (newCurrency: string) => {
      try {
        await cacheService.put('defaultCurrency', newCurrency);
        await setCurrency(newCurrency);
        await mutation.mutateAsync(newCurrency);
        await queryClient.invalidateQueries([`user-${currency}-wallet`]);
        await queryClient.invalidateQueries([`transactions-bill-${currency}`]);
        await queryClient.invalidateQueries([`payout-transactions-${currency}`]);
        await queryClient.invalidateQueries([`transactions-${currency}`]);
        await queryClient.invalidateQueries([`user-currency`]);
        await queryClient.invalidateQueries([`user-withdrals-${currency}`]);
      } catch (error) {
        console.error('currency hook ', error);
      }
    },
    [currency],
  );
  const handleRefreshCurrency = useCallback(async () => {
    try {
      await queryClient.invalidateQueries([`user-${currency}-wallet`]);
      await queryClient.invalidateQueries([`transactions-bill-${currency}`]);
      await queryClient.invalidateQueries([`payout-transactions-${currency}`]);
      await queryClient.invalidateQueries([`transactions-${currency}`]);
      await queryClient.invalidateQueries([`user-withdrals-${currency}`]);
      await queryClient.invalidateQueries([`user-currency`]);
    } catch (error) {
      console.error('refresh currency ', error);
    }
  }, [currency]);

  return {
    handleSwitchCurrency,
    handleRefreshCurrency,
    currency: ans || currency,
    currencyLoading: isFetching,
    currencyWallet: data?.data,
  };
};
