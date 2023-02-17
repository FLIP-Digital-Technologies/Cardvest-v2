import { ShowPassword } from '@assets/SVG';
import { Input as NBInput, Box, Text, Pressable } from 'native-base';
import React from 'react';

export const getKeyboardType = (label: string) => {
  switch (label) {
    case 'Mobile Number':
    case 'Phone Number':
    case 'Meter Number':
      return 'phone-pad';
    case 'Amount':
    case 'Amount in USD':
      return 'decimal-pad';
    case 'Email Address':
      return 'email-address';
    default:
      return 'default';
  }
};

const Input = ({
  label = '',
  placeholder = '',
  fontWeight = '',
  color = 'CARDVESTBLACK.50',
  InputRightElement,
  value,
  type,
  onChangeText,
  disabled = false,
  maxLength = '',
}: {
  label?: string;
  fontWeight?: string;
  placeholder?: string;
  color?: string;
  InputRightElement?: any;
  value?: any;
  onChangeText?: (value: any) => void;
  type?: 'text' | 'password' | undefined;
  disabled?: boolean | undefined;
  maxLength?: string | number | undefined;
}) => {
  const [show, setShow] = React.useState(false);
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB" borderRadius={'8px'}>
        <NBInput
          color={color}
          size="lg"
          fontWeight={fontWeight || 'light'}
          borderWidth={0}
          borderRadius={'8px'}
          py="4"
          px="3"
          maxLength={maxLength ? Number(maxLength) : undefined}
          isDisabled={disabled}
          value={value}
          style={{ backgroundColor: '#F7F9FB' }}
          placeholder={placeholder}
          _focus={{
            backgroundColor: '#F7F9FB',
          }}
          keyboardType={getKeyboardType(label)}
          InputRightElement={
            type === 'password' ? (
              <Pressable onPress={() => setShow(!show)} h="5" w="5" mr="4" ml="2" justifyContent="center">
                <ShowPassword show={show} />
              </Pressable>
            ) : (
              InputRightElement
            )
          }
          type={type !== 'password' ? type : show ? 'text' : 'password'}
          onChangeText={onChangeText}
        />
      </Box>
    </Box>
  );
};

export default Input;
