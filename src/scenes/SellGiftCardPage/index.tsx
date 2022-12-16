import { useCreateUser, useDeleteUser, useModifyUser } from '@api/hooks/useUser';
import {
  NotificationBell,
  Withdrawal,
  BuyGiftCard,
  Data,
  Airtime,
  Cable,
  More,
  Transaction,
  BackButton,
} from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import {
  Avatar,
  Box,
  HStack,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
  Select,
  CheckIcon,
  Pressable,
  Button,
} from 'native-base';
import React, { useCallback, FC, memo, SetStateAction, Dispatch, ReactElement, JSXElementConstructor } from 'react';
import { useTranslation } from 'react-i18next';

const SellGiftCard: FC<{ action: () => void; actionText: string; children: React.ReactNode }> = ({
  action,
  actionText = 'Submit',
  children,
}) => {
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
          padding: '20px',
        }}>
        <VStack>
          <HStack w="100%" alignItems="center">
            <Pressable h="10" w="10">
              <BackButton />
            </Pressable>
            <Text fontSize="md" mx="auto" textAlign="center">
              Buy Data
            </Text>
            <View w="10" />
          </HStack>
          <VStack>{children}</VStack>
          <VStack>
            <Button onPress={action} my="3" size="lg" p="4" fontSize="md" backgroundColor="CARDVESTGREEN" color="white">
              {actionText}
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(SellGiftCard);
