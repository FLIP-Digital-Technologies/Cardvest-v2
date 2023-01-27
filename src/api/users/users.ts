import ApiClient from '@api';
import env from '@env';
import { cacheService } from '@utils/cache';
import {
  CreateUserRequestPayload,
  CreateUserSuccessPayload,
  DeleteUserRequestPayload,
  ModifyUserRequestPayload,
  ModifyUserSuccessPayload,
  UserDetailsRequestPayload,
  UserDetailsSuccessPayload,
  UsersRequestPayload,
  UsersSuccessPayload,
  ModifyUserPasswordRequestPayload,
} from './types';

export async function getUsers({ pageParam, per_page }: UsersRequestPayload) {
  try {
    const response = await ApiClient.get<UsersSuccessPayload>(`${env.API_URL}/users`, {
      params: {
        ...(pageParam && {
          page: pageParam,
        }),
        ...(per_page && {
          per_page,
        }),
      },
    });

    return response.data;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}

export async function getUserDetails({ userId }: UserDetailsRequestPayload) {
  try {
    const response = await ApiClient.get<UserDetailsSuccessPayload>(`${env.API_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('getUserDetails - Error: ', error);
    throw error;
  }
}

export async function createUser({ name, job }: CreateUserRequestPayload) {
  try {
    const response = await ApiClient.post<CreateUserSuccessPayload>(`${env.API_URL}/users`, {
      params: {
        name,
        job,
      },
    });

    return response.data;
  } catch (error) {
    console.error('createUser - Error: ', error);
    throw error;
  }
}

export async function modifyUser({ userId, username, phonenumber, email }: ModifyUserRequestPayload) {
  try {
    // You can use also patch
    const token = await cacheService.get('login-user');
    const response = await ApiClient.put<ModifyUserSuccessPayload>(
      `${env.API_URL}/users/${userId}`,
      {
        username,
        phonenumber,
        email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data;
  } catch (error) {
    console.error('modifyUser - Error: ', error);
    throw error;
  }
}

export async function modifyUserPassword({
  userId,
  current_password,
  password,
  password_confirmation,
}: ModifyUserPasswordRequestPayload) {
  try {
    // You can use also patch
    const response = await ApiClient.put<ModifyUserSuccessPayload>(`${env.API_URL}/users/${userId}/password`, {
      params: {
        userId,
        current_password,
        password,
        password_confirmation,
      },
    });

    return response.data;
  } catch (error) {
    console.error('modifyUserPassword - Error: ', error);
    throw error;
  }
}

export async function deleteUser({ userId }: DeleteUserRequestPayload) {
  try {
    const response = await ApiClient.delete(`${env.API_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('deleteUser - Error: ', error);
    throw error;
  }
}
