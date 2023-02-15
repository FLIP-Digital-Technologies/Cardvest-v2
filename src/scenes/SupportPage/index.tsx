import { SendEmail, RightAngle, SupportChat } from '@assets/SVG';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Divider, HStack, Text, View, VStack, Link } from 'native-base';
import React, { FC, memo } from 'react';
import { Linking, Pressable } from 'react-native';

const SupportPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Help & Support">
      <VStack my="7">
        {[
          {
            name: 'Live Chat Support',
            link: 'LiveChat',
            icon: <SupportChat />,
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
            <Divider bg="#F7F9FB" />
          </Pressable>
        ))}
        <Link isExternal w="100%" href="mailto:support@cardvest.ng">
          <HStack py="4" w="100%" justifyContent="space-between" alignItems="center">
            <HStack justifyContent="space-between" mr="auto" alignItems="center">
              <View width="5" h="8">
                <SendEmail />
              </View>
              <Text fontWeight="light" px="4">
                Send an Email
              </Text>
            </HStack>
            <View width="5" h="8">
              <RightAngle />
            </View>
          </HStack>
        </Link>
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(SupportPage);
