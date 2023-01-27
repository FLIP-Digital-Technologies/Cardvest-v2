import ApiClient from '@api';
import env from '@env';

export async function getReferredUsers() {
  try {
    const response = await ApiClient.get(`${env.API_URL}/referrals`);

    return response.data;
  } catch (error) {
    console.error('getReferredUsers - Error: ', error);
    throw error;
  }
}
