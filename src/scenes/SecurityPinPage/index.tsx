import { FingerScan, Key, Password, RightAngle } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Divider, HStack, Switch, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

const SecurityPinPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Transaction PIN">
      <VStack my="7">
        {[
          {
            name: 'Change PIN',
            link: 'ChangePin',
          },
          {
            name: 'Reset PIN',
            link: 'ResetPin',
          },
        ].map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate(item.link)}>
            <HStack py="4" justifyContent="space-between" alignItems="center">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontWeight="light">{item.name}</Text>
              </HStack>
              <View width="5" h="8">
                <RightAngle />
              </View>
            </HStack>
            {index !== 3 && <Divider bg="#F7F9FB" />}
          </Pressable>
        ))}
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(SecurityPinPage);
