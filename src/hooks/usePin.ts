import { confirmUserPin, setUpUserPin } from '@api/users/users';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { onOpenToast } from '@utils/toast';
import { useCallback, useEffect, useState } from 'react';

export const usePin = () => {
  const navigation = useNavigation<GenericNavigationProps>();
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
      await confirmUserPin({ pin: codeCurrentState });
      await setUpUserPin({ pin: codeState });
      await confirmUserPin({ pin: codeConfirmState });
      setIsLoading(false);
      navigation.navigate('Pin');
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }, [codeCurrentState, codeState, codeConfirmState]);

  const handleSetUpTransactionPin = useCallback(async () => {
    if (codeConfirmState !== codeState) {
      return onOpenToast({
        status: 'error',
        message: 'Pin are not the same',
      });
    }
    setIsLoading(true);
    try {
      await setUpUserPin({ pin: codeState });
      await confirmUserPin({ pin: codeConfirmState });
      setIsLoading(false);
      navigation.navigate('Dashboard');
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeCurrentState, codeState, codeConfirmState]);

  const handleConfirmPin = useCallback(async (code: any) => {
    setIsLoading(true);
    try {
      await confirmUserPin({ pin: code });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
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
  };
};
