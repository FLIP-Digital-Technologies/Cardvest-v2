import { TextArea as NBTextArea, Box, Text } from 'native-base';
import React from 'react';

const TextArea = ({
  label = '',
  placeholder = '',
  fontWeight = '',
  color = 'CARDVESTBLACK.50',
  InputRightElement,
  value,
  onChangeText,
}: {
  label?: string;
  fontWeight?: string;
  placeholder?: string;
  color?: string;
  InputRightElement?: any;
  value?: string;
  onChangeText?: (value: any) => void;
}) => {
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.50" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <NBTextArea
          color={color}
          size="xl"
          h={20}
          autoCompleteType
          fontWeight={fontWeight || 'light'}
          borderWidth={0}
          py="3"
          px="3"
          value={value}
          style={{ backgroundColor: '#F7F9FB' }}
          placeholder={placeholder}
          InputRightElement={InputRightElement}
          onChangeText={onChangeText}
        />
      </Box>
    </Box>
  );
};

export default TextArea;
