import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';
import {
  CreateBankAccountRequestPayload,
  CreateVBAPayload,
  DeleteBankAccountRequestPayload,
  VerifyBVNPayload,
  VerifyBankAccountRequestPayload,
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

export async function getVBADetails(currency: string) {
  try {
    const token = await cacheService.get('login-user');

    const response = await ApiClient.get(`${env.API_URL}/transactions/deposit/vba`, {
      params: { currency },
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (error) {
    console.error('Error fetching VBA Details: ', error);
    throw error;
  }
}

export async function getBVNStatus(currency: string) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/users/bank-verification`, {
      params: { currency },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('BVN VERIFICATION RESPONSE', response);
    console.log('BVN VERIFICATION RESPONSE DATA', response.data);

    return response.data;
  } catch (error) {
    console.log(error);
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

export async function createVBA({ currency }: CreateVBAPayload) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(`${env.API_URL}/transactions/deposit/create-vba?currency=${currency}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('createVBA - Error: ', error);
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

export async function verifyBVN({ firstName, lastName, bvn, currency }: VerifyBVNPayload) {
  try {
    console.log(firstName, lastName);

    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(
      `${env.API_URL}/users/bank-verification?currency=${currency}`,
      { firstname: firstName, lastname: lastName, bvn },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('verify BVN - Error: ', error);
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
