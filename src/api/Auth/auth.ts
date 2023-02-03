import ApiClient from '@api';
import { LoginUserRequestPayload, ForgotPasswordRequestPayload, SendOTPRequestPayload } from '@api/users/types';
import { cacheService } from '@utils/cache';
// import { cacheService } from '@utils/cache';
import deviceInfoModule from 'react-native-device-info';

export async function loginUser({ email, password }: LoginUserRequestPayload) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/login`, {
      email,
      password,
      device_name: deviceInfoModule.getDeviceId(),
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error('loginUser - Error: ', error);
    throw error;
  }
}

export async function createUser({ email, password, username, phonenumber, terms, referrer, nationality }: any) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/register`, {
      username,
      phonenumber,
      terms,
      referrer,
      email,
      password,
      nationality,
    });

    return response.data;
  } catch (error) {
    console.error('createUser - Error: ', error);
    throw error;
  }
}

export async function forgotPassword({ email }: ForgotPasswordRequestPayload) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('forgotPassword - Error: ', error);
    throw error;
  }
}

export async function getUserData(token: string) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.get(`/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('getUserData - Error: ', error);
    throw error;
  }
}

export async function sendOTP({ token }: SendOTPRequestPayload) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/token`, {
      token,
    });
    return response.data;
  } catch (error) {
    console.error('sendOTP - Error: ', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const token = await cacheService.get('login-user');
    const data = await cacheService.get('user');
    const response = await ApiClient.post(
      `/auth/logout`,
      {
        email: data?.email,
        // password,
        device_name: deviceInfoModule.getDeviceId(),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('logoutUser - Error: ', error);
    throw error;
  }
}
