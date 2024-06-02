import ApiClient from '@api';
import {
  GiftCardsToBuyRequestPayload,
  GiftCardsToSellRequestPayload,
  GiftcardRequestPayload,
} from '@api/giftcards/types';
import env from '@env';
import { cacheService } from '@utils/cache';
import {
  Coin,
  CryptoTradeData,
  CryptoTransactionResponse,
  GetAvailableCoinsResponse,
  SellCryptoPayload,
} from './types';

export async function getAllCryptoTransactions(currency: string, pagination: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/transactions/crypto`, {
      params: { page: pagination?.pageParam, currency },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.error('getAllBillTransactions - Error: ', error);
    throw error;
  }
}

export async function getAvailableCoins({ currency }: { currency: string }): Promise<Coin[]> {
  if (!currency) throw new Error('Currency is required');

  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get<GetAvailableCoinsResponse>(`${env.API_URL}/transactions/crypto/coins`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.data.map(coin => ({
      ...coin,
      value: coin.name,
    }));
  } catch (error) {
    console.error('getAvailableCoins - Error: ', error);
    throw error;
  }
}

export async function createCryptoTransaction(payload: SellCryptoPayload): Promise<CryptoTradeData> {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post<CryptoTransactionResponse>(`${env.API_URL}/transactions/crypto`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('createCryptoTransaction - Error: ', error);
    throw error;
  }
}
