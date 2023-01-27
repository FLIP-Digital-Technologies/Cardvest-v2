import ApiClient from '@api';
import { RetriveWithdrawalRequestPayload, InitiateWithdrawalRequestPayload } from '@api/withdrawals/types';
import env from '@env';

export async function getAllWithdrawals() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/withdrawals`);

    return response.data;
  } catch (error) {
    console.error('getAllWithdrawals - Error: ', error);
    throw error;
  }
}

export async function retriveWithdrawal({ withdrawal_reference }: RetriveWithdrawalRequestPayload) {
  try {
    const response = await ApiClient.get(`${env.API_URL}/withdrawals/${withdrawal_reference}`);

    return response.data;
  } catch (error) {
    console.error('retriveWithdrawal - Error: ', error);
    throw error;
  }
}

export async function initiateWithdrawal({ amount, bank }: InitiateWithdrawalRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/withdrawals`, {
      amount,
      bank,
    });

    return response.data;
  } catch (error) {
    console.error('initiateWithdrawal - Error: ', error);
    throw error;
  }
}
