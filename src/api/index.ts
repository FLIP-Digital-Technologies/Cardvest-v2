import env from '@env';
import { cacheService } from '@utils/cache';
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
    // const notificationParam: any = {
    //   status: 'error',
    //   message: error?.response?.data?.errors
    //     ? error?.response?.data?.errors.map((i: any) => i.message).join(' .')
    //     : error?.response?.data?.message || '',
    // };

    if (
      (error?.response?.status === 403 || error?.response?.status === 401) &&
      error?.response?.data?.message.includes('Unauthenticated')
    ) {
      await cacheService.del('login-user');
      await cacheService.del('user');
      // await logoutUser();
      // notificationParam.description += 'Please contact support.';
    }

    // if (error?.response?.status === 404) {
    //   notificationParam.message = 'Not Found';
    // }

    // if (error?.response?.status === 500) {
    //   notificationParam.message = 'Internal Server Error';
    // }

    // if (error?.response?.status === 508) {
    //   notificationParam.message = 'Time Out';
    // }

    // if (notificationParam.message) onOpenToast(notificationParam);

    return Promise.reject(error);
  },
);

export default ApiClient;
