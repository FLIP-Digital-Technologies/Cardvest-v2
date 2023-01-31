import { Connect, Rate, Refer, RightAngle, Suggestion } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Divider, HStack, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

const KYCPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Show some love">
      <VStack my="7">
        {[
          {
            name: 'Rate Us',
            link: '',
            icon: <Rate />,
          },
          {
            name: 'Suggestion Box',
            link: '',
            icon: <Suggestion />,
          },
          {
            name: 'Refer Friends',
            link: 'Referrals',
            icon: <Refer />,
          },
          {
            name: 'Connect with Us',
            link: '',
            icon: <Connect />,
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
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(KYCPage);
