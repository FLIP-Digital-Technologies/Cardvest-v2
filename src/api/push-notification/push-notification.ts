import ApiClient from '@api';
import { RegisterDeviceRequestPayload } from '@api/push-notification/types';
import env from '@env';
import { cacheService } from '@utils/cache';

export async function getNotification() {
  try {
    const token = await cacheService.get('login-user');
    const response = await ApiClient.get(`${env.API_URL}/notifications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('getNotification - Error: ', error);
    throw error;
  }
}

export async function getNotificationHealth() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/push-notification/health`);

    return response.data;
  } catch (error) {
    console.error('getNotificationHealth - Error: ', error);
    throw error;
  }
}

export async function registerDevice({ token, description, user_id, type }: RegisterDeviceRequestPayload) {
  try {
    const response = await ApiClient.post(`${env.API_URL}/push-notification/register`, {
      token,
      description,
      user_id,
      type,
    });

    return response.data;
  } catch (error) {
    console.error('registerDevice - Error: ', error);
    throw error;
  }
}
