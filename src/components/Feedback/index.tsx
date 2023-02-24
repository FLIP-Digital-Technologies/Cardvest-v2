import { Success } from '@assets/SVG';
import { Text, VStack, View, Button } from 'native-base';
import React from 'react';

const SuccessFeedback = ({
  title = '',
  message = '',
  action,
  actionText = 'Continue',
}: {
  title?: string;
  message?: string;
  action?: () => void;
  actionText?: string;
}) => {
  return (
    <VStack py="10" px="2">
      <View h="150" w="150" m="auto">
        <Success />
      </View>
      <Text textAlign="center" fontSize="3xl" mb="1" color="CARDVESTGREEN">
        {title}
      </Text>
      <Text textAlign="center" fontSize="md" color="CARDVESTGREY.50">
        {message}
      </Text>
      {action && (
        <VStack mt="6">
          <Button onPress={action} my="3" size="lg" p="4" fontSize="md" backgroundColor="CARDVESTGREEN" color="white">
            {actionText}
          </Button>
        </VStack>
      )}
    </VStack>
  );
};

export { SuccessFeedback };
