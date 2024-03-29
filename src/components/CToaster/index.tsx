import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Alert, CloseIcon, HStack, IconButton, Text, VStack } from 'native-base';
import React, { FC } from 'react';

interface CToasterProps {
  status: 'info' | 'warning' | 'success' | 'error' | undefined;
  title: string | undefined;
  onClose?: () => void;
}

const CToaster: FC<CToasterProps> = ({ status, title, onClose }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  if (title === 'Session expired, please login again on 401') {
    setTimeout(() => navigation.navigate('Login'), 1000);
  }
  return (
    <Alert shadow={2} maxW="400" w="100%" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" numberOfLines={3} color="coolGray.800">
              {title}
            </Text>
          </HStack>
          {onClose && (
            <IconButton
              onPress={onClose}
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<CloseIcon size="3" color="coolGray.600" />}
            />
          )}
        </HStack>
      </VStack>
    </Alert>
  );
};

export default CToaster;
