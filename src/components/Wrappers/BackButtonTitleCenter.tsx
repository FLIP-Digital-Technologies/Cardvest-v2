import { BackButton } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { HStack, ScrollView, Text, View, VStack, Pressable, Button } from 'native-base';
import React, { FC, memo } from 'react';
import { RefreshControl } from 'react-native';

const BackButtonTitleCenter: FC<{
  action?: () => void;
  actionText?: string;
  children: React.ReactNode;
  title: string;
  backAction?: (() => void) | null;
  isDisabled?: boolean | null;
  isLoading?: boolean | null;
  noScroll?: boolean | null;
  onRefresh?: (() => void) | null;
  refreshing?: boolean | null;
}> = ({
  onRefresh,
  refreshing = false,
  action,
  actionText,
  children,
  title,
  backAction,
  isDisabled = false,
  isLoading = false,
  noScroll = false,
}) => {
  const navigation = useNavigation<GenericNavigationProps>();
  if (noScroll) {
    return (
      <CSafeAreaView>
        <HStack w="100%" alignItems="center">
          <Pressable h="10" w="10" onPress={backAction ? backAction : () => navigation.goBack()}>
            <BackButton />
          </Pressable>
          <Text fontSize="lg" mx="auto" textAlign="center">
            {title}
          </Text>
          <View w="10" />
        </HStack>
        <VStack pb="3" />
        {children}
      </CSafeAreaView>
    );
  }
  return (
    <CSafeAreaView>
      <HStack w="100%" alignItems="center">
        <Pressable h="10" w="10" onPress={backAction ? backAction : () => navigation.goBack()}>
          <BackButton />
        </Pressable>
        <Text fontSize="lg" mx="auto" textAlign="center">
          {title}
        </Text>
        <View w="10" />
      </HStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // @ts-ignore
        refreshControl={onRefresh && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
        }}>
        <VStack pb="3">
          <VStack>{children}</VStack>
          {actionText && (
            <VStack>
              <Button
                onPress={action}
                isDisabled={isDisabled}
                isLoading={isLoading}
                my="3"
                size="lg"
                p="4"
                fontSize="md"
                backgroundColor="CARDVESTGREEN"
                color="white">
                {actionText || 'Submit'}
              </Button>
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(BackButtonTitleCenter);
