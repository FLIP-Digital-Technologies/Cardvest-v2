import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';
import {
  VerifyBankAccountRequestPayload,
  CreateBankAccountRequestPayload,
  DeleteBankAccountRequestPayload,
} from './types';

export async function getBankAccount(currency: string) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/bank-accounts`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { currency },
    });
    return response.data;
  } catch (error) {
    console.error('getBankAccount - Error: ', error);
    throw error;
  }
}

export async function getAllBankAccounts(currency: string) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/bank-accounts/banks`, {
      params: { currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllBankAccounts - Error: ', error);
    throw error;
  }
}

export async function verifyBankAccount({ banknumber, bankname, currency }: VerifyBankAccountRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/bank-accounts/verify`,
      {
        banknumber,
        bankname,
        currency,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('verifyBankAccount - Error: ', error);
    throw error;
  }
}

export async function createBankAccount({
  banknumber,
  bankname,
  code,
  accountname,
  currency,
}: CreateBankAccountRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/bank-accounts`,
      {
        banknumber,
        bankname,
        code,
        accountname,
        currency,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('createBankAccount - Error: ', error);
    throw error;
  }
}

export async function deleteBankAccount({ bank_id }: DeleteBankAccountRequestPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.delete(`${env.API_URL}/bank-accounts/${bank_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('deleteBankAccount - Error: ', error);
    throw error;
  }
}
