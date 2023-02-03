import { useGetUserCurrencyWallet, useSwitchDefaultWallet } from '@api/hooks/useWallet';
import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { useCallback, useEffect, useState } from 'react';

export const useCurrency = () => {
  const [currency, setCurrency] = useState('NGN');
  useEffect(() => {
    const fetchDefaultCurrency = async () => {
      const response = await cacheService.get('defaultCurrency');
      return setCurrency(response || 'NGN');
    };

    fetchDefaultCurrency();
  });
  const { mutate: switchCurrency } = useSwitchDefaultWallet();
  const { data, isFetching } = useGetUserCurrencyWallet(currency);
  const queryClient = useQueryClient();
  const handleSwitchCurrency = useCallback(
    async (newCurrency: string) => {
      try {
        await switchCurrency(newCurrency);
        await cacheService.put('defaultCurrency', newCurrency);
        await setCurrency(newCurrency);
        await queryClient.invalidateQueries([`user-${currency}-wallet`]);
      } catch (error) {
        console.error(error);
      }
    },
    [currency],
  );

  return {
    handleSwitchCurrency,
    currency,
    currencyLoading: isFetching,
    currencyWallet: data?.data,
  };
};
