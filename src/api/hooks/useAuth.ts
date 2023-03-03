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
        await cacheService.put('firstTime', 'Yes');
        onOpenToast({
          status: 'success',
          message: 'User created successfully, Kindly login with your email and password.',
        });
      },
      onError: async (data: AxiosError) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b
            ? `${data?.response?.data?.message} ${data?.b}`
            : data?.response?.data?.message || 'An error occurred whie creating your account',
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
      if (!data?.data?.user?.email_verified) {
        await cacheService.put('temp-login-user', data?.data?.token);
        await navigation.navigate('ResendVerify', {
          email: data?.data?.email,
        });
        // return onOpenToast({
        //   status: 'error',
        //   message: 'Please kindly verify your email.',
        // });
      } else {
        const response = await cacheService.get('defaultCurrency');
        await cacheService.put('login-user', data?.data?.token);
        await queryClient.setQueryData(['login-user'], data?.data?.token);
        await queryClient.setQueryData([`user-currency`], response || 'NGN');
        await navigation.navigate(data?.data?.user?.pin_set ? 'Dashboard' : 'SetTransactionPin');
        const user = await getUserData(data?.data?.token);
        await queryClient.setQueryData([`user`], user?.data);
        await cacheService.del('temp-login-user');
        await cacheService.put('user', user?.data);
        await cacheService.put('firstTime', 'Yes');
        onOpenToast({
          status: 'success',
          message: 'Login successful',
        });
      }
    },
    onError: (data: AxiosError) => {
      console.log(data);
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: data?.b
          ? `${data?.response?.data?.message} ${data?.b}`
          : data?.response?.data?.message || 'An error occurred',
      });
    },
  });
}

export { useCreateUser, useLoginUser };
