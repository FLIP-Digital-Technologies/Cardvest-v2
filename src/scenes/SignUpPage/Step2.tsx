import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, Image, Button, HStack, Pressable, ScrollView } from 'native-base';
import React, { FC, memo, useState, useRef } from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const SignUpStep2: FC = ({ count, setCount }: { count: number; setCount: any }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <View flex={3} p="3" my="7">
      <Input label="Country" />
      <Input label="Phone Number" />
      <Button
        onPress={() => navigation.navigate('SignUpStep3')}
        my="3"
        size="lg"
        p="4"
        fontSize="md"
        backgroundColor="CARDVESTGREEN"
        color="white">
        Next
      </Button>
    </View>
  );
};

export default memo(SignUpStep2);
