import IntroPng from '@assets/images/intro.png';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Image, Button, HStack, Pressable } from 'native-base';
import React, { FC, memo, useState } from 'react';
import PagerView from 'react-native-pager-view';
import Svg, { Circle } from 'react-native-svg';

export const SlidePage = ({ title, body }: { title: string; body: string }) => (
  <Center flex={3}>
    <Text color="CARDVESTGREEN" textAlign="center" width="80%" fontSize="3xl" fontWeight="bold">
      {title}
    </Text>
    <Text color="CARDVESTGREY.100" textAlign="center" width="80%" fontSize="md" fontWeight="light">
      {body}
    </Text>
  </Center>
);

const IndicatorDot = ({ pageIndex, index }: { pageIndex: number; index: number }) => (
  <Svg height="10" width="10">
    <Circle cx="5" cy="5" r="5" fill={pageIndex === index ? '#235643' : '#D9D9D9'} />
  </Svg>
);

const Intro: FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <Center flex={6}>
        <Image source={IntroPng} alt="intro" />
      </Center>
      <Center>
        <HStack space="xs">
          <IndicatorDot pageIndex={pageIndex} index={0} />
          <IndicatorDot pageIndex={pageIndex} index={1} />
          <IndicatorDot pageIndex={pageIndex} index={2} />
        </HStack>
      </Center>
      <PagerView
        style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
        initialPage={0}
        onPageSelected={e => {
          setPageIndex(e?.nativeEvent?.position);
        }}>
        <View key="1">
          <SlidePage
            title="Current Rates"
            body="Our rates are auto-updated at par with Chinese rates. Always current rates is displayed on CardVest."
          />
        </View>
        <View key="2">
          <SlidePage
            title="Customer Friendly"
            body="CardVest is designed and simplified for beginners and experienced gift cards traders."
          />
        </View>
        <View key="3">
          <SlidePage
            title="Speedy Payment"
            body="We don't joke with how fast you receive your payment. Once your card is verified, we pay out in minutes!"
          />
        </View>
      </PagerView>
      <Center flex={2} p="4">
        <Button
          onPress={() => navigation.navigate('Auth')}
          my="3"
          width="95%"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Get Started
        </Button>
        <Pressable onPress={() => navigation.navigate('Auth')}>
          <Text fontSize="md" color="CARDVESTGREEN">
            Already have an account? <Text fontWeight={'bold'}>Login</Text>
          </Text>
        </Pressable>
      </Center>
    </CSafeAreaView>
  );
};

export default memo(Intro);
