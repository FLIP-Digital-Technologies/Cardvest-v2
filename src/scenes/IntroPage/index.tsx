import Intro2Png from '@assets/images/intro2.png';
import Intro3Png from '@assets/images/intro3.png';
import IntroPng from '@assets/images/intro.png';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BoldText } from '@scenes/LoginPage';
import { View, Text, Center, Image, Button, HStack, Pressable } from 'native-base';
import React, { FC, memo, useState } from 'react';
import PagerView from 'react-native-pager-view';
import Svg, { Circle } from 'react-native-svg';

export const SlidePage = ({ title, body }: { title: string; body: string }) => (
  <Center flex={4}>
    <BoldText color="CARDVESTGREEN" textAlign="center" width="80%" fontSize="3xl" py="2">
      {title}
    </BoldText>
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
      <PagerView
        style={{ flex: 12, alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}
        initialPage={0}
        onPageSelected={e => {
          setPageIndex(e?.nativeEvent?.position);
        }}>
        <React.Fragment key="1">
          <Center my="8" flex={10}>
            <Image source={IntroPng} w="100%" h="100%" alt="intro" />
          </Center>
          <Center>
            <HStack space="xs" my="2">
              <IndicatorDot pageIndex={pageIndex} index={0} />
              <IndicatorDot pageIndex={pageIndex} index={1} />
              <IndicatorDot pageIndex={pageIndex} index={2} />
            </HStack>
          </Center>
          <SlidePage
            title="Real Time Rates"
            body="The rates displayed on CardVest are constantly updated to align with current market rates."
          />
        </React.Fragment>
        <React.Fragment key="2">
          <Center my="8" flex={10}>
            <Image source={Intro2Png} w="100%" h="100%" alt="intro" />
          </Center>
          <Center>
            <HStack space="xs" my="2">
              <IndicatorDot pageIndex={pageIndex} index={0} />
              <IndicatorDot pageIndex={pageIndex} index={1} />
              <IndicatorDot pageIndex={pageIndex} index={2} />
            </HStack>
          </Center>
          <SlidePage
            title="Customer Friendly"
            body="CardVest is made easy for both newbies and pro gift card traders."
          />
        </React.Fragment>
        <React.Fragment key="3">
          <Center my="8" flex={10}>
            <Image source={Intro3Png} w="100%" h="100%" alt="intro" />
          </Center>
          <Center>
            <HStack space="xs" my="2">
              <IndicatorDot pageIndex={pageIndex} index={0} />
              <IndicatorDot pageIndex={pageIndex} index={1} />
              <IndicatorDot pageIndex={pageIndex} index={2} />
            </HStack>
          </Center>
          <SlidePage
            title="Lightening fast Payment"
            body="We don't joke with how fast you receive your payment. Once your card is verified, we settle payments within seconds!"
          />
        </React.Fragment>
      </PagerView>
      <Center flex={3} px="4" pb="4">
        <Button
          onPress={() => navigation.navigate('Login')}
          my="3"
          width="95%"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Get Started
        </Button>
        <Pressable w="100%" onPress={() => navigation.navigate('Login')}>
          <Text textAlign="center" fontSize="md" color="CARDVESTGREEN">
            Already have an account? <Text fontWeight={'bold'}>Login</Text>
          </Text>
        </Pressable>
      </Center>
    </CSafeAreaView>
  );
};

export default memo(Intro);
