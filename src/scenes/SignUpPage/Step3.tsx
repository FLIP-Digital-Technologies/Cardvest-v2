import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View, Text, Center, HStack, Button, Pressable, ScrollView } from 'native-base';
import React, { FC, memo } from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';

const SignUpStep3: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <View flex={3} p="3" my="8">
      <Input label="Referral Code (Optional)" />
      <Input label="How did you hear about us?" />
      <Button
        onPress={() => navigation.navigate('Verify')}
        my="3"
        size="lg"
        p="4"
        fontSize="md"
        backgroundColor="CARDVESTGREEN"
        color="white">
        Continue
      </Button>
    </View>
  );
};

export default memo(SignUpStep3);
