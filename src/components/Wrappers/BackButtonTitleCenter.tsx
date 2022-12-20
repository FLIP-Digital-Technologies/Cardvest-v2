import { BackButton } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { HStack, ScrollView, Text, View, VStack, Pressable, Button } from 'native-base';
import React, { FC, memo } from 'react';

const BackButtonTitleCenter: FC<{
  action?: () => void;
  actionText?: string;
  children: React.ReactNode;
  title: string;
  backAction?: () => void;
}> = ({ action, actionText, children, title, backAction }) => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View pt="6" px="2">
        <HStack w="100%" alignItems="center">
          <Pressable h="10" w="10" onPress={() => navigation.goBack()}>
            <BackButton />
          </Pressable>
          <Text fontSize="lg" mx="auto" textAlign="center">
            {title}
          </Text>
          <View w="10" />
        </HStack>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          // flex: 1,
          flexGrow: 1,
          padding: '5px 20px',
        }}>
        <VStack pb="3" px="3">
          <VStack>{children}</VStack>
          {actionText && (
            <VStack>
              <Button
                onPress={action}
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
