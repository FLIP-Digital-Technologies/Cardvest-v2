import ApiClient from '@api';
import {
  GiftCardsToSellRequestPayload,
  GiftCardsToBuyRequestPayload,
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
  try {
    const token = await cacheService.get('login-user');
    if (!category_id) return;
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
  if (!card_id) return;
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/giftcards/${card_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getGiftcard - Error: ', error);
    throw error;
  }
}
