import { CreateUserRequestPayload, ModifyUserRequestPayload, UserDetailsRequestPayload } from '@api/users/types';
import { createUser, getUserDetails, modifyUser, modifyUserPassword } from '@api/users/users';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useUser({ userId }: UserDetailsRequestPayload) {
  return useQuery([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
    enabled: !!userId,
  });
}

function useCreateUser() {
  return useMutation(['new-user'], ({ name, job }: CreateUserRequestPayload) => createUser({ name, job }), {
    onSuccess: (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'User created successfully',
      });
    },
    onError: (/*data*/) => {
      onOpenToast({
        status: 'error',
        message: 'User not created',
      });
    },
  });
}

function useModifyUser() {
  const queryClient = useQueryClient();
  return useMutation(
    ['modify-user'],
    ({ userId, email, username, phonenumber }: ModifyUserRequestPayload) =>
      modifyUser({ userId, email, username, phonenumber }),
    {
      onSuccess: (/*data*/) => {
        queryClient.invalidateQueries({ queryKey: ['user'] });
        onOpenToast({
          status: 'success',
          message: 'User details Updated successfully',
        });
      },
      onError: (/*data*/) => {
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
        onOpenToast({
          status: 'error',
          message: data?.response?.data?.message || 'User Password failed to update',
        });
      },
    },
  );
}
// function useDeleteUser() {
//   return useMutation(['delete-user'], ({ userId }: DeleteUserRequestPayload) => deleteUser({ userId }), {
//     onSuccess: (/*data*/) => {
//       onOpenToast({
//         status: 'success',
//         message: 'User deleted successfully',
//       });
//     },
//     onError: (/*data*/) => {
//       onOpenToast({
//         status: 'error',
//         message: 'User not deleted',
//       });
//     },
//   });
// }

export { useUser, useCreateUser, useModifyUser, useModifyUserPassword };
