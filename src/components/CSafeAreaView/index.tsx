import { Box, KeyboardAvoidingView } from 'native-base';
import React, { FC, ReactNode } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CSafeAreaViewProps {
  children: ReactNode;
}

const CSafeAreaView: FC<CSafeAreaViewProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Box px="5" style={{ paddingTop: Math.max(insets.top, 16) }} background="#FFFFFF" width="100%" height="100%">
        {children}
      </Box>
    </KeyboardAvoidingView>
  );
};

export default CSafeAreaView;
