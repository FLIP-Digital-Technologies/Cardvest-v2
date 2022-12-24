import { createStackNavigator } from '@react-navigation/stack';
import ForgetPasswordEnterEmailPage from '@scenes/ForgetPasswordEnterEmailPage';
import IntroPage from '@scenes/IntroPage';
import LoginPage from '@scenes/LoginPage';
import ResetPage from '@scenes/ResetPage';
import SignUpPage from '@scenes/SignUpPage';
import Step2 from '@scenes/SignUpPage/Step2';
import Step3 from '@scenes/SignUpPage/Step3';
import VerifyPage from '@scenes/VerifyPage';
import { cacheService } from '@utils/cache';
import React, { FC, useLayoutEffect, useState } from 'react';
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
  const [isUserLogin, setIsUserLogin] = useState<string | undefined | null>('');
  async function getUser() {
    const user = await cacheService.get('login-user');
    setIsUserLogin(user);
  }
  useLayoutEffect(() => {
    getUser();
  }, []);
  return (
    <RootStack.Navigator initialRouteName="Intro">
      <RootStack.Screen
        name="Intro"
        component={IntroPage}
        options={{
          headerShown: false,
        }}
      />
      {/* {isUserLogin ? ( */}
      <RootStack.Screen
        name="Dashboard"
        component={MainStackScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* ) : ( */}
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* )} */}
    </RootStack.Navigator>
  );
};
