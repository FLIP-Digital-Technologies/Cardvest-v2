import CLoader from '@components/CLoader';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPasswordEnterEmailPage from '@scenes/ForgetPasswordEnterEmailPage';
import IntroPage from '@scenes/IntroPage';
import LoginPage from '@scenes/LoginPage';
import ResetPage from '@scenes/ResetPage';
import SetTransactionPin from '@scenes/SetTransactionPin';
import SignUpPage from '@scenes/SignUpPage';
import Step2 from '@scenes/SignUpPage/Step2';
import Step3 from '@scenes/SignUpPage/Step3';
import VerifyPage from '@scenes/VerifyPage';
import { useQuery } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import React, { FC } from 'react';
// import { routeOverlayOption } from './routeOptions';
import { MainStackScreen } from './stacks/MainStack';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SignUpStack = createStackNavigator();

export const SignUpStackScreen: FC = () => {
  return (
    <SignUpStack.Navigator initialRouteName="SignUp">
      <SignUpStack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{
          headerShown: false,
        }}
      />
      <SignUpStack.Screen
        name="SignUpStep2"
        component={Step2}
        options={{
          headerShown: false,
        }}
      />
      <SignUpStack.Screen
        name="SignUpStep3"
        component={Step3}
        options={{
          headerShown: false,
        }}
      />
    </SignUpStack.Navigator>
  );
};

export const AuthStackScreen: FC = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Verify"
        component={VerifyPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ForgetPassword"
        component={ForgetPasswordEnterEmailPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Reset"
        component={ResetPage}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export const RootStackScreen: FC = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['login-user'],
    queryFn: async () => cacheService.get('login-user'),
  });
  if (isFetching) return <CLoader />;
  return (
    <RootStack.Navigator initialRouteName={data ? 'Dashboard' : 'Intro'}>
      {typeof data === 'string' ? (
        <RootStack.Screen
          name="Dashboard"
          component={MainStackScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <React.Fragment>
          <RootStack.Screen
            name="Intro"
            component={IntroPage}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              headerShown: false,
            }}
          />
        </React.Fragment>
      )}
      <RootStack.Screen
        name="SetTransactionPin"
        component={SetTransactionPin}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
