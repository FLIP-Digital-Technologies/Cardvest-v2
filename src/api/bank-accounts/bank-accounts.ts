import ApiClient from '@api';
import env from '@env';
import {
  VerifyBankAccountRequestPayload,
  CreateBankAccountRequestPayload,
  DeleteBankAccountRequestPayload,
} from './types';

export async function getBankAccount() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/bank-accounts`);

    return response.data;
  } catch (error) {
    console.error('getBankAccount - Error: ', error);
    throw error;
  }
}

export async function getAllBankAccounts() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/bank-accounts/banks`);

    return response.data;
  } catch (error) {
    console.error('getAllBankAccounts - Error: ', error);
    throw error;
  }
}

export async function verifyBankAccount({ banknumber, bankname }: VerifyBankAccountRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/bank-accounts/verify`, {
      banknumber,
      bankname,
    });

    return response.data;
  } catch (error) {
    console.error('verifyBankAccount - Error: ', error);
    throw error;
  }
}

export async function createBankAccount({ banknumber, bankname, code, accountname }: CreateBankAccountRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/bank-accounts`, {
      banknumber,
      bankname,
      code,
      accountname,
    });

    return response.data;
  } catch (error) {
    console.error('createBankAccount - Error: ', error);
    throw error;
  }
}

export async function deleteBankAccount({ bank_id }: DeleteBankAccountRequestPayload) {
  try {
    const response = await ApiClient.delete(`${env.API_URL}/bank-accounts//${bank_id}`);

    return response.data;
  } catch (error) {
    console.error('deleteBankAccount - Error: ', error);
    throw error;
  }
}
