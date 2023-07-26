import { getNotification } from '@api/push-notification/push-notification';
import { ModifyUserRequestPayload, UserDetailsRequestPayload } from '@api/users/types';
import { deleteUser, getUserDetails, modifyUser, modifyUserPassword, resendVerificationEmail } from '@api/users/users';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';

function useGetNotification() {
  return useQuery([`user-notifications`], () => getNotification());
}

function useUser({ userId }: UserDetailsRequestPayload) {
  return useQuery([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
    enabled: !!userId,
  });
}

function useResendVerificationEmail() {
  return useMutation(['resend-user'], () => resendVerificationEmail(), {
    onSuccess: (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'Verification email sent successfully',
      });
    },
    onError: (data: any) => {
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: 'Resend Verification Email Failed',
      });
    },
  });
}

function useModifyUser() {
  const queryClient = useQueryClient();
  return useMutation(
    ['modify-user'],
    ({ userId, email, username, phonenumber, lastname, firstname, image_url }: ModifyUserRequestPayload) =>
      modifyUser({ userId, email, username, phonenumber, lastname, firstname, image_url }),
    {
      onSuccess: (/*data*/) => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        onOpenToast({
          status: 'success',
          message: 'User details updated successful',
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: 'User details fail to update',
        });
      },
    },
  );
}

function useModifyUserPassword() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['modify-user-password'],
    ({ password_confirmation, current_password, password, userId }: any) =>
      modifyUserPassword({ password_confirmation, current_password, password, userId }),
    {
      onSuccess: (/*data*/) => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        onOpenToast({
          status: 'success',
          message: 'User Password Updated successfully',
        });
        navigation.navigate('Security');
      },
      onError: data => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.response?.data?.message || 'User Password failed to update',
        });
      },
    },
  );
}

function useDeleteUser() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(['delete-user'], ({ password, token }: any) => deleteUser({ password, token }), {
    onSuccess: async (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'User deleted successfully',
      });
      await cacheService.del('login-user');
      await cacheService.del('user');
      await queryClient.setQueriesData(['user'], null);
      await queryClient.setQueriesData(['login-user'], null);
      await queryClient.invalidateQueries({ queryKey: ['login-user'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      await navigation.navigate('Login');
      await queryClient.clear();
    },
    onError: (data: any) => {
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: 'User not deleted',
      });
    },
  });
}

export { useDeleteUser, useGetNotification, useModifyUser, useModifyUserPassword, useResendVerificationEmail, useUser };
