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
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          padding: '20px',
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center flex={1} mt="20">
          <Text mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl" fontWeight="bold">
            Create Account
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your details to get started
          </Text>
          <HStack mt="7" space="xs" alignItems="center">
            <Svg height="36" width="36">
              <Circle cx="18" cy="18" r="18" fill={'#D9D9D9'} />
              <Path d="M18.8094 13.57V25H20.5014V11.986H16.0734V13.57H18.8094Z" fill="white" />
            </Svg>
            <Svg height="10" width="50">
              <Line x1="0" y1="5" x2="60" y2="5" stroke="#E8E8E8" strokeWidth="2" />
            </Svg>
            <Svg height="36" width="36">
              <Circle cx="18" cy="18" r="18" fill={'#D9D9D9'} />
              <Path
                d="M22.9352 24.982V23.344H16.9232L19.6232 21.004C21.9272 19.006 22.8452 17.692 22.8452 15.838C22.8452 13.336 21.1712 11.752 18.5612 11.752C15.9152 11.752 14.1512 13.57 14.0972 16.36H15.8612C15.8972 14.506 16.9412 13.336 18.5432 13.336C20.1092 13.336 21.0452 14.308 21.0452 15.946C21.0452 17.332 20.4512 18.214 18.3452 20.032L14.1512 23.65V25L22.9352 24.982Z"
                fill="white"
              />
            </Svg>
            <Svg height="10" width="50">
              <Line x1="0" y1="5" x2="60" y2="5" stroke="#E8E8E8" strokeWidth="2" />
            </Svg>
            <Svg height="36" width="36">
              <Circle cx="18" cy="18" r="18" fill={'#235643'} />
              <Path
                d="M17.9928 18.268C20.0628 18.268 21.1428 19.312 21.1428 20.878C21.1428 22.552 20.0448 23.632 18.3528 23.632C16.7148 23.632 15.6708 22.642 15.6708 20.95H13.9248C13.9248 23.65 15.7608 25.216 18.3168 25.216C20.9628 25.216 22.9428 23.542 22.9428 20.914C22.9428 18.574 21.2688 17.08 19.0548 16.81L22.6188 13.408V11.986H14.5368V13.552H20.3868L16.6968 17.098V18.268H17.9928Z"
                fill="white"
              />
            </Svg>
          </HStack>
        </Center>
        <View flex={3} p="3" my="8" mx="3">
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
        <Center flex={1} px="4" justifyContent="space-between">
          <Pressable mt="2" onPress={() => navigation.navigate('Login')}>
            <Text fontSize="md" color="CARDVESTGREEN">
              Already have an account? <Text fontWeight={'bold'}>Login</Text>
            </Text>
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(SignUpStep3);
