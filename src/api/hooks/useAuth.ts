import { createUser, getUserData, loginUser } from '@api/Auth/auth';
import { LoginUserRequestPayload } from '@api/users/types';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { AxiosError } from 'axios';

function useCreateUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['new-user'],
    ({ email, password, username, phonenumber, terms, referrer, nationality }: any) =>
      createUser({ email, password, username, phonenumber, terms, referrer, nationality }),
    {
      onSuccess: async data => {
        await navigation.navigate('Verify', {
          email: data?.data?.email,
        });
        onOpenToast({
          status: 'success',
          message: 'User created successfully, Kindly login with your email and password.',
        });
      },
      onError: (data: AxiosError) => {
        navigation.navigate('Verify');
        console.log(data?.response);
        onOpenToast({
          status: 'error',
          message: data?.response?.data?.message || 'User not created',
        });
      },
    },
  );
}

function useLoginUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  return useMutation(['login-user'], ({ email, password }: LoginUserRequestPayload) => loginUser({ email, password }), {
    onSuccess: async data => {
      const user = await getUserData(data?.data?.token);
      await queryClient.setQueryData(['login-user'], data?.data?.token);
      await queryClient.setQueryData([`user`], user?.data);
      await cacheService.put('user', user?.data);
      await cacheService.put('login-user', data?.data?.token);
      await navigation.navigate('Dashboard');
      onOpenToast({
        status: 'success',
        message: 'User Login successfully',
      });
    },
    onError: (data: AxiosError) => {
      onOpenToast({
        status: 'error',
        message: data?.response?.data?.message || 'An error occurred',
      });
    },
  });
}

export { useCreateUser, useLoginUser };
