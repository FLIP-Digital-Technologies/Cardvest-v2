import { FingerScan, Key, Password, RightAngle } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { cacheService } from '@utils/cache';
import { Divider, HStack, Switch, Text, View, VStack } from 'native-base';
import React, { FC, memo, useLayoutEffect, useState } from 'react';
import { Pressable } from 'react-native';

const SecurityPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [isChecked, setIsChecked] = useState(false);
  useLayoutEffect(() => {
    async function fetchRes() {
      try {
        const res = await cacheService.get('@bio-login-user');
        if (res.length > 0) {
          setIsChecked(true);
        } else {
          setIsChecked(false);
        }
      } catch (error) {
        return false;
      }
    }
    fetchRes();
  });
  return (
    <BackButtonTitleCenter title="Security">
      <VStack my="7">
        {[
          {
            name: 'Password',
            link: 'Password',
            icon: <Password />,
          },
          {
            name: 'Transaction PIN',
            link: 'Pin',
            icon: <Key />,
          },
        ].map((item, index) => (
          <Pressable key={index} onPress={() => navigation.navigate(item.link)}>
            <HStack py="4" justifyContent="space-between" alignItems="center">
              <HStack justifyContent="space-between" alignItems="center">
                <View width="5" h="8">
                  {item.icon}
                </View>
                <Text fontWeight="light" px="4">
                  {item.name}
                </Text>
              </HStack>
              <View width="5" h="8">
                <RightAngle />
              </View>
            </HStack>
            {index !== 3 && <Divider bg="#F7F9FB" />}
          </Pressable>
        ))}
        <Pressable>
          <HStack py="4" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" alignItems="center">
              <View width="5" h="8">
                <FingerScan />
              </View>
              <Text fontWeight="light" px="4">
                Face ID or Touch ID
              </Text>
            </HStack>
            <View h="8">
              <Switch
                onToggle={async () => {
                  if (!isChecked === true) {
                    await cacheService.put('@bio-login-user', 'yes');
                  } else {
                    await cacheService.del('@bio-login-user');
                  }
                  setIsChecked(!isChecked);
                }}
                isChecked={isChecked}
                size="md"
                onThumbColor="CARDVESTGREEN"
                onTrackColor="#EFEFEF"
              />
            </View>
          </HStack>
        </Pressable>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(SecurityPage);
