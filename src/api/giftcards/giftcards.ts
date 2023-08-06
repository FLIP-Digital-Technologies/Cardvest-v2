import ApiClient from '@api';
import {
  GiftCardsToBuyRequestPayload,
  GiftCardsToSellRequestPayload,
  GiftcardRequestPayload,
} from '@api/giftcards/types';
import env from '@env';
import { cacheService } from '@utils/cache';

export async function getAllGiftcards() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllGiftcards - Error: ', error);
    throw error;
  }
}

export async function getAllBuyGiftCardCategories() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/buy`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllBuyGiftCardCategories - Error: ', error);
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcard-categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAllCategories - Error: ', error);
    throw error;
  }
}

export async function getGiftcardsToSell({ category_id }: GiftCardsToSellRequestPayload) {
  if (!category_id) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcard-categories/sell/${category_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getGiftcardsToSell - Error: ', error);
    throw error;
  }
}

export async function getGiftcardsToBuy({ category_id }: GiftCardsToBuyRequestPayload) {
  if (!category_id) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcard-categories/buy/${category_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getGiftcardsToBuy - Error: ', error);
    throw error;
  }
}

export async function getAcceptableGiftcards() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/sell`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getAcceptableGiftcards - Error: ', error);
    throw error;
  }
}

export async function getBuyableGiftcards() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/buy`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getBuyableGiftcards - Error: ', error);
    throw error;
  }
}

export async function getGiftcard({ card_id }: GiftcardRequestPayload) {
  console.log(card_id);
  if (!card_id) return;
  console.log(card_id);
  // try {
  //   const token = await cacheService.get('login-user');
  //   const response = await ApiClient.get(`${env.API_URL}/giftcards/${card_id}`, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });

  //   return response.data;
  // } catch (error) {
  //   console.error('getGiftcard - Error: ', error);
  //   throw error;
  // }
}

export async function getCountries() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/buy/countries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('COUNTRIES DATA', response.data.data);
    return response.data.data.map((item: any) => ({ label: item.name, value: item.isoName, img: item.flagUrl }));
  } catch (error) {
    console.error('getCountriesReq - Error: ', error);
    throw error;
  }
}

export async function getGiftcardsByCountry(country: string) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/buy/${country}/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.map((item: any) => ({ label: item.name, value: item.id, ...item }));
  } catch (error) {
    console.error('getBuyableGiftcards - Error: ', error);
    throw error;
  }
}

export async function createBuyTransaction(payload: any) {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.post(`${env.API_URL}/transactions/buy`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('createTransaction - Error: ', error);
    throw error;
  }
}
