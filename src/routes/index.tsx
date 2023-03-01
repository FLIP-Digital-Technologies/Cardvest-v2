import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GenericNavigationProps } from '@routes/types';
import ForgetPasswordEnterEmailPage from '@scenes/ForgetPasswordEnterEmailPage';
import IntroPage from '@scenes/IntroPage';
import LoginBackPage from '@scenes/LoginBackPage';
import LoginPage from '@scenes/LoginPage';
import ResetPage from '@scenes/ResetPage';
import SetTransactionPin from '@scenes/SetTransactionPin';
import SignUpPage from '@scenes/SignUpPage';
import Step2 from '@scenes/SignUpPage/Step2';
import Step3 from '@scenes/SignUpPage/Step3';
import VerifyPage from '@scenes/VerifyPage';
import { useQuery } from '@tanstack/react-query';
import navigationService from '@utils/Nav';
import { cacheService } from '@utils/cache';
import React, { FC, useEffect, useLayoutEffect } from 'react';
// import { routeOverlayOption } from './routeOptions';
import { MainStackScreen } from './stacks/MainStack';

const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

export const AuthStackScreen: FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="LoginBack"
        component={LoginBackPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUpStep2"
        component={Step2}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SignUpStep3"
        component={Step3}
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
  const navigation = useNavigation<GenericNavigationProps>();
  useLayoutEffect(() => {
    async function fetchToks() {
      try {
        const toks = await cacheService.get('login-user');
        const res = await cacheService.get('firstTime');
        if (res !== 'Yes') {
          await navigation.navigate('Intro');
          return;
        } else if (res === 'Yes' && toks.length === 0) {
          await navigation.navigate('Login');
          return;
        } else if (res === 'Yes' && toks.length > 0) {
          navigation.navigate('LoginBack');
        }
      } catch (error) {
        return false;
      }
    }
    fetchToks();
  }, []);
  useEffect(() => {
    navigationService.navigation = navigation;
  }, [navigation]);
  return (
    <RootStack.Navigator>
      {/* {typeof data === 'string' && data.length > 3 ? ( */}
      {/* ) : ( */}
      <React.Fragment>
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="Intro"
          component={IntroPage}
          options={{
            headerShown: false,
          }}
        />
      </React.Fragment>
      <React.Fragment>
        <RootStack.Screen
          name="Dashboard"
          component={MainStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SetTransactionPin"
          component={SetTransactionPin}
          options={{
            headerShown: false,
          }}
        />
      </React.Fragment>
      {/* )} */}
    </RootStack.Navigator>
  );
};
