import {
  CreateUserRequestPayload,
  DeleteUserRequestPayload,
  ModifyUserRequestPayload,
  UserDetailsRequestPayload,
} from '@api/users/types';
import { createUser, deleteUser, getUserDetails, modifyUser } from '@api/users/users';
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

function useDeleteUser() {
  return useMutation(['delete-user'], ({ userId }: DeleteUserRequestPayload) => deleteUser({ userId }), {
    onSuccess: (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'User deleted successfully',
      });
    },
    onError: (/*data*/) => {
      onOpenToast({
        status: 'error',
        message: 'User not deleted',
      });
    },
  });
}

export { useUser, useCreateUser, useModifyUser, useDeleteUser };
