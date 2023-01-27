import { Input as NBInput, Box, Text } from 'native-base';
import React from 'react';

const Input = ({
  label = '',
  placeholder = '',
  fontWeight = '',
  color = 'CARDVESTBLACK.50',
  InputRightElement,
  value,
  type,
  onChangeText,
}: {
  label?: string;
  fontWeight?: string;
  placeholder?: string;
  color?: string;
  InputRightElement?: any;
  value?: any;
  onChangeText?: (value: any) => void;
  type?: 'text' | 'password' | undefined;
}) => {
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <NBInput
          color={color}
          size="xl"
          fontWeight={fontWeight || 'light'}
          borderWidth={0}
          py="3"
          px="3"
          value={value}
          style={{ backgroundColor: '#F7F9FB' }}
          placeholder={placeholder}
          InputRightElement={InputRightElement}
          type={type}
          onChangeText={onChangeText}
        />
      </Box>
    </Box>
  );
};

export default Input;
