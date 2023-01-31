import { logoutUser } from '@api/Auth/auth';
import { Logout, Profile, Referral, RightAngle, Security, Suggestion } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { Divider, HStack, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

const SettingsPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  async function handleLogout() {
    await logoutUser();
    await cacheService.del('login-user');
    await cacheService.del('user');
    await queryClient.setQueriesData(['user'], null);
    await queryClient.setQueriesData(['login-user'], null);
    await queryClient.invalidateQueries({ queryKey: ['login-user'] });
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    await navigation.navigate('Auth');
  }
  return (
    <BackButtonTitleCenter title="Settings">
      <VStack my="7">
        {[
          {
            name: 'Profile',
            link: 'Profile',
            icon: <Profile />,
          },
          {
            name: 'KYC',
            link: 'KYC',
            icon: <Suggestion />,
          },
          {
            name: 'Security',
            link: 'Security',
            icon: <Security />,
          },
          {
            name: 'Referrals',
            link: 'Referrals',
            icon: <Referral />,
          },
          {
            name: 'Log Out',
            link: '',
            icon: <Logout />,
          },
        ].map((item, index) => (
          <Pressable key={index} onPress={() => (index === 4 ? handleLogout() : navigation.navigate(item.link))}>
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
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(SettingsPage);
