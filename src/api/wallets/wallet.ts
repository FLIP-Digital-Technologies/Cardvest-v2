import ApiClient from '@api';
import { SwitchDefaultWalletRequestPayload } from '@api/wallets/types';
import env from '@env';
import { cacheService } from '@utils/cache';

export async function getDefaultWallet() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/wallets`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getDefaultWallet - Error: ', error);
    throw error;
  }
}

export async function getCurrencyWallet(currency: string) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/wallets/${currency}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getCurrencyWallet - Error: ', error);
    throw error;
  }
}

export async function switchDefaultWallet({ currency }: SwitchDefaultWalletRequestPayload) {
  console.log('switchDefaultWallet', currency);
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/wallets/default`,
      {
        currency,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('initiateWithdrawal - Error: ', error);
    throw error;
  }
}
