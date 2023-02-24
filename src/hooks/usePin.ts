import { confirmUserPin, reSetUserPin, resetUserWithTokenPin, setUpUserPin, updateUserPin } from '@api/users/users';
import { useNavigation } from '@react-navigation/native';
import { onOpenToast } from '@utils/toast';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

export const usePin = () => {
  const navigation = useNavigation();
  const [codeCurrentState, updateCodeCurrent] = useState('');
  const [codeState, updateCode] = useState('');
  const [codeConfirmState, updateCodeConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePin = useCallback(async () => {
    if (codeConfirmState !== codeState) {
      return onOpenToast({
        status: 'error',
        message: 'Pin are not the same',
      });
    }
    setIsLoading(true);
    try {
      const res = await updateUserPin({ pin: codeState, current_pin: codeCurrentState });
      setIsLoading(false);
      onOpenToast({
        status: 'success',
        message: res.message || 'Update successful',
      });
      updateCodeConfirm('');
      updateCode('');
      updateCodeCurrent('');
      navigation.navigate('Pin');
    } catch (e: AxiosError) {
      setIsLoading(false);
      console.log(e);
    }
  }, [codeCurrentState, codeState, codeConfirmState]);

  const handleSetUpTransactionPin = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await setUpUserPin({ pin: codeState });
      await confirmUserPin({ pin: codeConfirmState });
      onOpenToast({
        status: 'success',
        message: res.message || 'Pin setup successfully',
      });
      setIsLoading(false);
      updateCodeConfirm('');
      updateCode('');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (e: AxiosError) {
      setIsLoading(false);
      console.log(e);
      onOpenToast({
        status: 'error',
        message: e?.b ? `${e?.response?.data?.message}: ${e?.b}` : e?.response?.data?.message || 'An error occurred',
      });
      throw e;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeState, codeConfirmState]);
  resetUserWithTokenPin;

  const handleConfirmPin = async (code: any) => {
    setIsLoading(true);
    try {
      await confirmUserPin({ pin: code });
      setIsLoading(false);
    } catch (error: AxiosError) {
      setIsLoading(false);
      console.log(error);
      onOpenToast({
        status: 'error',
        message: error?.b
          ? `${error?.response?.data?.message}: ${error?.b}`
          : error?.response?.data?.message || 'An error occurred',
      });
      throw error;
    }
  };

  const handleResetWithTokenPin = async (pin: any, token: any) => {
    setIsLoading(true);
    try {
      const res = await resetUserWithTokenPin({ pin, token });
      setIsLoading(false);
      onOpenToast({
        status: 'success',
        message: res.message || 'Pin setup successfully',
      });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error: AxiosError) {
      setIsLoading(false);
      console.log(error);
      onOpenToast({
        status: 'error',
        message: error?.b
          ? `${error?.response?.data?.message}: ${error?.b}`
          : error?.response?.data?.message || 'An error occurred',
      });
      throw error;
    }
  };

  const handleResetPin = useCallback(async (password: string) => {
    setIsLoading(true);
    try {
      await reSetUserPin({
        password,
      });
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'ResetPinFeedback' }],
      });
    } catch (e: AxiosError) {
      setIsLoading(false);
      console.log(e);
      onOpenToast({
        status: 'error',
        message: e?.b ? `${e?.response?.data?.message}: ${e?.b}` : e?.response?.data?.message || 'An error occurred',
      });
      throw e;
    }
  }, []);

  return {
    codeCurrentState,
    codeState,
    codeConfirmState,
    updateCodeCurrent,
    updateCode,
    updateCodeConfirm,
    handleChangePin,
    handleSetUpTransactionPin,
    isLoading,
    handleConfirmPin,
    handleResetPin,
    handleResetWithTokenPin,
  };
};
