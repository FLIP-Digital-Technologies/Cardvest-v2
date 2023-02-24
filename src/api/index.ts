import env from '@env';
import navigationService from '@utils/Nav';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const ApiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// API Request interceptor
ApiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const jwtToken = await cacheService.get('login-user');
    if (jwtToken?.length > 0) {
      // @ts-ignore
      config = {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${jwtToken}`,
        },
      };
    }

    return config;
  },
  (error: any) => {
    Promise.reject(error);
  },
);

// API respone interceptor
ApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    let b;
    const token = await cacheService.get('login-user');
    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      error?.response?.data?.message.includes('Unauthenticated') &&
      token
    ) {
      await cacheService.del('login-user');
      await cacheService.del('user');
      await navigationService.navigation.navigate('Auth');
      return onOpenToast({
        status: 'error',
        message: 'Session expired, please login again on 401',
      });
    }
    if (error?.response?.data?.message.includes('The given data was invalid') || error?.response?.status === 422) {
      b =
        Object.values(error?.response?.data?.errors).length > 0
          ? Object.values(error?.response?.data?.errors).join(', ')
          : null;
      onOpenToast({
        status: 'error',
        message: b ? `${error?.response?.data?.message}: ${b}` : error?.response?.data?.message,
      });
      return Promise.reject({ c: error });
    }

    return Promise.reject({ ...error, b });
  },
);

export default ApiClient;
