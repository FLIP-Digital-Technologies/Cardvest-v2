import ApiClient from '@api';
import { RetriveWithdrawalRequestPayload, InitiateWithdrawalRequestPayload } from '@api/withdrawals/types';
import env from '@env';
import { cacheService } from '@utils/cache';

export async function getWithdrawalsUSDTRate({ currency }: { currency: string }) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/withdrawals/rate`, {
      params: { currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getWithdrawalsUSDTRate - Error: ', error);
    throw error;
  }
}

export async function getWithdrawalsUSDTNetwork() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/withdrawals/crytpo/networks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getWithdrawalsUSDTNetwork - Error: ', error);
    throw error;
  }
}

export async function getAllWithdrawals(currency: any, pagination: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/withdrawals`, {
      params: { page: pagination?.pageParam, currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllWithdrawals - Error: ', error);
    throw error;
  }
}

export async function retriveWithdrawal({ withdrawal_reference }: RetriveWithdrawalRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/withdrawals/${withdrawal_reference}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('retriveWithdrawal - Error: ', error);
    throw error;
  }
}

export async function initiateWithdrawal({ amount, bank, currency, type, wallet_address, network }: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/withdrawals`,
      {
        amount,
        bank,
        currency,
        type,
        wallet_address,
        network,
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
