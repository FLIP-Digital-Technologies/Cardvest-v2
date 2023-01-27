import { KYCDoc } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { HStack, Text, View, Center, Button, Pressable, VStack } from 'native-base';
import React, { FC, memo, useState } from 'react';
import Svg, { Circle, Line, Path } from 'react-native-svg';

export const ProgressStepperIndicator = ({
  count,
  setCount,
  isDisabled,
}: {
  count: number;
  setCount: any;
  isDisabled?: boolean;
}) => {
  return (
    <HStack mt="7" space="xs" alignItems="center">
      <Pressable disabled={isDisabled} onPress={() => setCount(1)}>
        <Svg height="36" width="36">
          <Circle cx="18" cy="18" r="18" fill={count >= 1 ? '#235643' : '#D9D9D9'} />
          <Path d="M18.8094 13.57V25H20.5014V11.986H16.0734V13.57H18.8094Z" fill="white" />
        </Svg>
      </Pressable>
      <Svg height="10" width="50">
        <Line x1="0" y1="5" x2="60" y2="5" stroke="#E8E8E8" strokeWidth="2" />
      </Svg>
      <Pressable disabled={isDisabled} onPress={() => setCount(2)}>
        <Svg height="36" width="36">
          <Circle cx="18" cy="18" r="18" fill={count >= 2 ? '#235643' : '#D9D9D9'} />
          <Path
            d="M22.9352 24.982V23.344H16.9232L19.6232 21.004C21.9272 19.006 22.8452 17.692 22.8452 15.838C22.8452 13.336 21.1712 11.752 18.5612 11.752C15.9152 11.752 14.1512 13.57 14.0972 16.36H15.8612C15.8972 14.506 16.9412 13.336 18.5432 13.336C20.1092 13.336 21.0452 14.308 21.0452 15.946C21.0452 17.332 20.4512 18.214 18.3452 20.032L14.1512 23.65V25L22.9352 24.982Z"
            fill="white"
          />
        </Svg>
      </Pressable>
      <Svg height="10" width="50">
        <Line x1="0" y1="5" x2="60" y2="5" stroke="#E8E8E8" strokeWidth="2" />
      </Svg>
      <Pressable disabled={isDisabled} onPress={() => setCount(3)}>
        <Svg height="36" width="36">
          <Circle cx="18" cy="18" r="18" fill={count >= 3 ? '#235643' : '#D9D9D9'} />
          <Path
            d="M17.9928 18.268C20.0628 18.268 21.1428 19.312 21.1428 20.878C21.1428 22.552 20.0448 23.632 18.3528 23.632C16.7148 23.632 15.6708 22.642 15.6708 20.95H13.9248C13.9248 23.65 15.7608 25.216 18.3168 25.216C20.9628 25.216 22.9428 23.542 22.9428 20.914C22.9428 18.574 21.2688 17.08 19.0548 16.81L22.6188 13.408V11.986H14.5368V13.552H20.3868L16.6968 17.098V18.268H17.9928Z"
            fill="white"
          />
        </Svg>
      </Pressable>
    </HStack>
  );
};

const StepOne = ({ count, setCount }: { count: number; setCount: any }) => {
  return (
    <React.Fragment>
      <Text fontSize="lg" mx="auto" textAlign="center">
        Personal Details
      </Text>
      <View my="8">
        <Input label="Account Name" />
        <Input label="Address" />
        <Input label="Phone Number" />
        <Input label="Email Address" />
        <Button
          onPress={() => setCount(count + 1)}
          my="3"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Continue
        </Button>
      </View>
    </React.Fragment>
  );
};

const StepTwo = ({ count, setCount }: { count: number; setCount: any }) => {
  return (
    <React.Fragment>
      <Text fontSize="lg" mx="auto" textAlign="center">
        Next of Kin
      </Text>
      <View my="8">
        <Input label="Full Name" />
        <Input label="Address" />
        <Input label="Phone Number" />
        <Input label="Email Address" />
        <Button
          onPress={() => setCount(count + 1)}
          my="3"
          size="lg"
          p="4"
          fontSize="md"
          backgroundColor="CARDVESTGREEN"
          color="white">
          Continue
        </Button>
      </View>
    </React.Fragment>
  );
};

const StepThree = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [page, setPage] = useState<number>(1);
  if (page === 1) {
    return (
      <React.Fragment>
        <Text fontSize="lg" mx="auto" textAlign="center">
          Identity Verification
        </Text>
        <View my="8">
          <Input label="Document Type" />
          <Input label="Document Number" />
          <Input label="Issue Date" />
          <Input label="Expiry Date" />
          <Button
            onPress={() => setPage(page + 1)}
            my="3"
            size="lg"
            p="4"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Continue
          </Button>
        </View>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <View mb="20">
        <Text fontSize="lg" mx="auto" textAlign="center">
          Upload Document
        </Text>
        <Pressable h="200" mx="10" mb="6" mt="2">
          <KYCDoc />
        </Pressable>
        <Text fontSize="sm" textAlign="center" fontWeight="light" color="CARDVESTGREY.400">
          Take a photo of your ID to complete your identity verification process.
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate('Settings')}
        mb="3"
        mt="10"
        size="lg"
        p="4"
        fontSize="md"
        backgroundColor="CARDVESTGREEN"
        color="white">
        Continue
      </Button>
    </React.Fragment>
  );
};

const KYCPage: FC = () => {
  const [count, setCount] = useState<number>(1);
  return (
    <BackButtonTitleCenter title="KYC">
      <VStack my="3">
        <Center mb="9">
          <ProgressStepperIndicator count={count} setCount={setCount} />
        </Center>
        {count === 1 && <StepOne {...{ count, setCount }} />}
        {count === 2 && <StepTwo {...{ count, setCount }} />}
        {count === 3 && <StepThree />}
      </VStack>
    </BackButtonTitleCenter>
  );
};

export default memo(KYCPage);
