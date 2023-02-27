import {
  createBankAccount,
  deleteBankAccount,
  getAllBankAccounts,
  getBankAccount,
  verifyBankAccount,
} from '@api/bank-accounts/bank-accounts';
import {
  CreateBankAccountRequestPayload,
  DeleteBankAccountRequestPayload,
  VerifyBankAccountRequestPayload,
} from '@api/bank-accounts/types';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useCreateBankAccount() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const navigation = useNavigation<GenericNavigationProps>();
  return useMutation(
    ['new-bank-account'],
    ({ banknumber, bankname, code, accountname, currency }: CreateBankAccountRequestPayload) =>
      createBankAccount({ banknumber, bankname, code, accountname, currency }),
    {
      onSuccess: async (data: any) => {
        await queryClient.invalidateQueries([`user-bank-${currency}`]);
        onOpenToast({
          status: 'success',
          message: 'Bank account created successfully',
        });
        navigation.navigate('AddAccountFeedback');
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b
            ? `${data?.response?.data?.message} ${data?.b}`
            : data?.response?.data?.message || 'Bank account not created',
        });
      },
    },
  );
}

function useVerifyBankAccount() {
  return useMutation(
    ['verify-bank-account'],
    ({ banknumber, bankname, currency }: VerifyBankAccountRequestPayload) =>
      verifyBankAccount({ banknumber, bankname, currency }),
    {
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'Bank verified successfully',
        });
      },
      onError: data => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b
            ? `${data?.response?.data?.message} ${data?.b}`
            : data?.response?.data?.message || 'Bank account not verified',
        });
      },
    },
  );
}

function useDeleteBankAccount() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  return useMutation(
    ['delete-bank-account'],
    ({ bank_id }: DeleteBankAccountRequestPayload) => deleteBankAccount({ bank_id }),
    {
      onSuccess: async (/*data*/) => {
        await queryClient.invalidateQueries([`user-bank-${currency}`]);
        onOpenToast({
          status: 'success',
          message: 'Bank has been deleted successfully',
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b
            ? `${data?.response?.data?.message} ${data?.b}`
            : data?.response?.data?.message || 'Bank account not verified',
        });
      },
    },
  );
}

function useGetUserBank(currency: string) {
  return useQuery([`user-bank-${currency}`], () => getBankAccount(currency));
}

function useGetBankList(currency: string) {
  return useQuery([`bank-list-${currency}`], () => getAllBankAccounts(currency));
}

export { useCreateBankAccount, useVerifyBankAccount, useGetBankList, useGetUserBank, useDeleteBankAccount };
