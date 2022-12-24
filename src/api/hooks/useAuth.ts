import { createUser, loginUser } from '@api/Auth/auth';
import { LoginUserRequestPayload } from '@api/users/types';
import { useMutation } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { AxiosError } from 'axios';

function useCreateUser() {
  return useMutation(
    ['new-user'],
    ({ email, password, username, phonenumber, terms, referrer }: any) =>
      createUser({ email, password, username, phonenumber, terms, referrer }),
    {
      onSuccess: async (/*data*/) => {
        await cacheService.put('login-user', 'in');
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
    },
  );
}

function useLoginUser() {
  return useMutation(['new-user'], ({ email, password }: LoginUserRequestPayload) => loginUser({ email, password }), {
    onSuccess: (/*data*/) => {
      onOpenToast({
        status: 'success',
        message: 'User created successfully',
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

// function useUser({ userId }: UserDetailsRequestPayload) {
//   return useQuery([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
//     enabled: !!userId,
//   });
// }

// function useModifyUser() {
//   return useMutation(
//     ['modify-user'],
//     ({ userId, name, job }: ModifyUserRequestPayload) => modifyUser({ userId, name, job }),
//     {
//       onSuccess: (/*data*/) => {
//         onOpenToast({
//           status: 'success',
//           message: 'User modified successfully',
//         });
//       },
//       onError: (/*data*/) => {
//         onOpenToast({
//           status: 'error',
//           message: 'User not modified',
//         });
//       },
//     },
//   );
// }

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

export { useCreateUser, useLoginUser };
