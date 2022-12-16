import { Box } from 'native-base';
import React, { FC, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CSafeAreaViewProps {
  children: ReactNode;
}

const CSafeAreaView: FC<CSafeAreaViewProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <Box style={{ paddingTop: Math.max(insets.bottom, 16) }} background="#EFEFEF" width="100%" height="100%">
      {children}
    </Box>
  );
};

export default CSafeAreaView;
