import { useMixpanel } from '@MixpanelAnalytics';
import {
  createBankAccount,
  createVBA,
  deleteBankAccount,
  getAllBankAccounts,
  getBVNStatus,
  getBankAccount,
  getVBADetails,
  verifyBVN,
  verifyBankAccount,
} from '@api/bank-accounts/bank-accounts';
import {
  CreateBankAccountRequestPayload,
  DeleteBankAccountRequestPayload,
  VerifyBVNPayload,
  VerifyBankAccountRequestPayload,
} from '@api/bank-accounts/types';
import { useCurrency } from '@hooks/useCurrency';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { onOpenToast } from '@utils/toast';

function useCreateBankAccount() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['new-bank-account'],
    ({ banknumber, bankname, code, accountname }: CreateBankAccountRequestPayload) =>
      createBankAccount({ banknumber, bankname, code, accountname, currency }),
    {
      onSuccess: async (data, variables) => {
        mixpanel.identify(user?.id?.toString());
        await queryClient.invalidateQueries([`user-bank-${currency}`]);
        mixpanel.track('Add Bank Account', {
          ...variables,
        });

        // Firebase Analytics: Add Bank Event
        await analytics().logEvent('add_bank', {
          user_id: data?.data?.user?.id,
          bank_name: variables.bankname,
          account_name: variables.accountname,
          account_number: variables.banknumber,
        });

        onOpenToast({
          status: 'success',
          message: 'Bank account created successfully',
        });
        navigation.navigate('AddAccountFeedback');
      },
      onError: (err: any) => {
        if (err?.c) return;
        onOpenToast({
          status: 'error',
          message: err?.b?.length > 0 ? `${err?.b}` : err?.response?.err?.message || 'Bank account not created',
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
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'Bank account not verified',
        });
      },
    },
  );
}

function useDeleteBankAccount() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const [mixpanel, user] = useMixpanel();
  return useMutation(
    ['delete-bank-account'],
    ({ bank_id }: DeleteBankAccountRequestPayload) => deleteBankAccount({ bank_id }),
    {
      onSuccess: async (_data, variables) => {
        mixpanel.identify(user?.id?.toString());
        await queryClient.invalidateQueries([`user-bank-${currency}`]);
        mixpanel.track('Remove Bank Account', {
          ...variables,
        });
        onOpenToast({
          status: 'success',
          message: 'Bank has been deleted successfully',
        });
      },
      onError: (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'Bank account not verified',
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

function useVerifyBVN() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();
  return useMutation(
    ['verify-bvn'],
    ({ firstName, lastName, bvn }: VerifyBVNPayload) => verifyBVN({ firstName, lastName, bvn, currency }),
    {
      onSuccess: async (data: any, variables) => {
        mixpanel.track('Verify BVN', {
          firstName: variables.firstName,
          lastName: variables.lastName,
        });

        queryClient.invalidateQueries({ queryKey: ['user'] });

        // Firebase Analytics: BVN Verification Event
        await analytics().logEvent('bvn_verified', {
          user_id: data?.data?.user?.id,
          first_name: variables.firstName,
          last_name: variables.lastName,
          // bvn: variables.bvn,
        });

        onOpenToast({
          status: 'success',
          message: 'BVN verified successfully',
        });

        navigation.navigate('IdentityVerifiedSuccessPage');
      },
      onError: (data: any) => {
        // console.log('BVN VERIFICATION ERROR: ', data);
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'BVN Verification failed.',
        });
      },
    },
  );
}

function useCreateVBA() {
  const queryClient = useQueryClient();
  const { currency } = useCurrency();
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();
  return useMutation(['verify-bvn'], () => createVBA({ currency }), {
    onSuccess: async (data: any) => {
      mixpanel.track('create-vba');
      queryClient.invalidateQueries({ queryKey: ['user'] });

      // Firebase Analytics: BVN Verification Event
      await analytics().logEvent('vba_created', {
        user_id: data?.data?.user?.id,
      });

      onOpenToast({
        status: 'success',
        message: 'Virtual bank account created.',
      });
      navigation.navigate('VBADetails');
    },
    onError: (data: any) => {
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message:
          data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'Error creating Virtual Bank Account.',
      });
    },
  });
}

function useGetVBADetails() {
  const { currency } = useCurrency();
  return useQuery([`vba-details-${currency}`], () => getVBADetails(currency));
}

function useCheckBVNVerification(enabled = false) {
  const { currency } = useCurrency();
  return useQuery({ queryKey: [`bvn-verified-${currency}`], queryFn: () => getBVNStatus(currency), enabled });
}

export {
  useCheckBVNVerification,
  useCreateBankAccount,
  useCreateVBA,
  useDeleteBankAccount,
  useGetBankList,
  useGetUserBank,
  useGetVBADetails,
  useVerifyBVN,
  useVerifyBankAccount,
};
