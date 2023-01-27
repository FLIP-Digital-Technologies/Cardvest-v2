import { createBankAccount, verifyBankAccount } from '@api/bank-accounts/bank-accounts';
import { CreateBankAccountRequestPayload, VerifyBankAccountRequestPayload } from '@api/bank-accounts/types';
import { useMutation } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useCreateBankAccount() {
  return useMutation(
    ['new-bank-account'],
    ({ banknumber, bankname, code, accountname }: CreateBankAccountRequestPayload) =>
      createBankAccount({ banknumber, bankname, code, accountname }),
    {
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'Bank account created successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'Bank account not created',
        });
      },
    },
  );
}

function useVerifyBankAccount() {
  return useMutation(
    ['new-bank-account'],
    ({ banknumber, bankname }: VerifyBankAccountRequestPayload) => verifyBankAccount({ banknumber, bankname }),
    {
      onSuccess: (/*data*/) => {
        onOpenToast({
          status: 'success',
          message: 'Bank verified successfully',
        });
      },
      onError: (/*data*/) => {
        onOpenToast({
          status: 'error',
          message: 'Bank account not verified',
        });
      },
    },
  );
}

export { useCreateBankAccount, useVerifyBankAccount };
