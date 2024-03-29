import { useMixpanel } from '@MixpanelAnalytics';
import { createUser, getUserData, loginUser } from '@api/Auth/auth';
import { LoginUserRequestPayload } from '@api/users/types';
import env from '@env';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { onOpenToast } from '@utils/toast';
import { Adjust, AdjustEvent } from 'react-native-adjust';

function useCreateUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  const [mixpanel] = useMixpanel();
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

        // Mixpanel user identification
        mixpanel.identify(`${data?.data?.id}`);
        // Set the users data if it doesn't exist
        mixpanel.getPeople().set('username', data?.data?.username);
        mixpanel.getPeople().set('email', data?.data?.email);
        mixpanel.getPeople().set('phone number', data?.data?.phonenumber);
        // Mixpanel User Login
        mixpanel.track('SignUp');

        const adjustEvent = new AdjustEvent(env.ACC_CRT);
        adjustEvent.setTransactionId(`${data?.data?.id}-${data?.data?.email}`);
        Adjust.trackEvent(adjustEvent);

        // Firebase Analytics: Registration Event
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

        await analytics().logEvent('registered', {
          first_name: '',
          last_name: '',
          username: data?.data?.username,
          email_address: data?.data?.email,
          phone_number: data?.data?.phonenumber,
          country: data?.data?.nationality,
          reg_date: currentDate,
          reg_time: currentTime,
        });

        onOpenToast({
          status: 'success',
          message: 'User created successfully, Kindly login with your email and password.',
        });
      },
      onError: async (data: any) => {
        if (data?.c) return;
        onOpenToast({
          status: 'error',
          message:
            data?.b?.length > 0
              ? `${data?.b}`
              : data?.response?.data?.message || 'An error occurred whie creating your account',
        });
      },
    },
  );
}

function useLoginUser() {
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  const [mixpanel] = useMixpanel();
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
        // Mixpanel user identification
        mixpanel.identify(`${data?.data?.user?.id}`);

        // Set the users data if it doesn't exist
        mixpanel.getPeople().set('name', `${data?.data?.user?.firstname} ${data?.data?.user?.lastname}`);
        mixpanel.getPeople().set('username', data?.data?.user?.username);
        mixpanel.getPeople().set('email', data?.data?.user?.email);
        mixpanel.getPeople().set('phone number', data?.data?.user?.phonenumber);

        // Mixpanel User Login
        mixpanel.track('Login');

        // Firebase Analytics: Login Event
        const currentDate = new Date().toISOString().split('T')[0];
        const currentTime = new Date().toISOString().split('T')[1].split('.')[0];

        await analytics().logEvent('login', {
          username: data?.data?.user?.username,
          user_id: data?.data?.user?.id,
          login_date: currentDate,
          login_time: currentTime,
        });

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
    onError: (data: any) => {
      console.error('login error: ', data);
      if (data?.c) return;
      onOpenToast({
        status: 'error',
        message: data?.b?.length > 0 ? `${data?.b}` : data?.response?.data?.message || 'An error occurred',
      });
    },
  });
}

export { useCreateUser, useLoginUser };
