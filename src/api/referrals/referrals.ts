import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';

export async function getReferredUsers() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/referrals`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getReferredUsers - Error: ', error);
    throw error;
  }
}

export async function getReferralUserCode() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/referrals/code`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error('getReferralUserCode - Error: ', error);
    throw error;
  }
}
