import ApiClient from '@api';
import { LoginUserRequestPayload } from '@api/users/types';
import deviceInfoModule from 'react-native-device-info';

export async function loginUser({ email, password }: LoginUserRequestPayload) {
  try {
    // const uuid = await deviceInfoModule.getInstanceId();
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/login`, {
      email,
      password,
      device_name: deviceInfoModule.getDeviceId(),
    });

    return response.data;
  } catch (error) {
    console.error('loginUser - Error: ', error);
    throw error;
  }
}

export async function createUser({ email, password, username, phonenumber, terms, referrer }: any) {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/register`, {
      username,
      phonenumber,
      terms,
      referrer,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('createUser - Error: ', error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    // const response = await ApiClient.post<TYPE>(`${env.API_URL}/users`, {
    const response = await ApiClient.post(`/auth/logout`);
    return response.data;
  } catch (error) {
    console.error('logoutUser - Error: ', error);
    throw error;
  }
}
