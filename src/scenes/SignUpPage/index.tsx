import { useCreateUser } from '@api/hooks/useAuth';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { ProgressStepperIndicator } from '@scenes/KYCPage';
import { validateEmail } from '@scenes/LoginPage';
import { View, Text, Center, Button, Pressable, ScrollView, HStack, CheckIcon, Select, Box } from 'native-base';
import React, { FC, memo, useCallback, useState } from 'react';

// export const validateEmail = (value: string) => {
//   if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/i.test(value)) {
//     return true;
//   }
//   return false;
// };

const ReferralSelect = (props: any) => {
  const { value, setValue, label } = props;
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <Select
          selectedValue={value}
          minWidth="200"
          accessibilityLabel="How did you hear about us?"
          placeholder="How did you hear about us?"
          borderColor="#F7F9FB"
          _selectedItem={{
            bg: '#F7F2DD',
            endIcon: <CheckIcon size="5" />,
          }}
          height="50px"
          fontSize="md"
          onValueChange={(itemValue: string) => setValue(itemValue)}>
          <Select.Item
            isDisabled
            label="How did you hear about us?"
            value="non"
            _disabled={{ opacity: 1 }}
            startIcon={
              <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="CARDVESTGREEN">
                  Select County
                </Text>
              </HStack>
            }
          />
          <Select.Item label="Referral" value="Referral" />
          <Select.Item label="From a friend/colleague" value="From a friend/colleague" />
          <Select.Item label="Sponsored Ads" value="Sponsored Ads" />
          <Select.Item label="Instagram" value="Instagram" />
          <Select.Item label="FaceBook" value="FaceBook" />
        </Select>
      </Box>
    </Box>
  );
};

export const CountrySelect = (props: any) => {
  const { value, setValue, label } = props;
  return (
    <Box my="2">
      {label && (
        <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
          {label}
        </Text>
      )}
      <Box backgroundColor="#F7F9FB">
        <Select
          selectedValue={value}
          minWidth="200"
          accessibilityLabel="Select Country"
          placeholder="Select Country"
          borderColor="#F7F9FB"
          _selectedItem={{
            bg: '#F7F2DD',
            endIcon: <CheckIcon size="5" />,
          }}
          height="50px"
          fontSize="md"
          onValueChange={(itemValue: string) => setValue(itemValue)}>
          <Select.Item
            isDisabled
            label="Select Country"
            value="non"
            _disabled={{ opacity: 1 }}
            startIcon={
              <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="CARDVESTGREEN">
                  Select County
                </Text>
              </HStack>
            }
          />
          <Select.Item label="Nigeria" value="Nigeria" />
          <Select.Item label="Ghana" value="Ghana" />
        </Select>
      </Box>
    </Box>
  );
};

const StepOne = (props: any) => {
  const { count, setCount, email, setEmail, password, setPassword, username, setUsername } = props;
  const handleDisabled = () => !email || !password || !username || validateEmail(email);
  return (
    <View p="3" my="6">
      <Input label="Username" onChangeText={setUsername} />
      <Input label="Email Address" onChangeText={setEmail} />
      <Input type="password" label="Password" onChangeText={setPassword} />
      <Button
        onPress={() => setCount(count + 1)}
        isDisabled={handleDisabled()}
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

const StepTwo = (props: any) => {
  const { count, setCount, country, setCountry, phoneNumber, setPhoneNumber } = props;
  const handleDisabled = useCallback(() => {
    return (
      !phoneNumber ||
      !country ||
      (country === 'Nigeria' && phoneNumber.length !== 11) ||
      (country === 'Ghana' && phoneNumber.length !== 10)
    );
  }, [country, phoneNumber]);
  return (
    <View flex={3} p="3" my="6">
      <CountrySelect label="Country" value={country} setValue={setCountry} />
      <Input label="Phone Number" onChangeText={setPhoneNumber} />
      <Button
        onPress={() => setCount(count + 1)}
        isDisabled={handleDisabled()}
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

const StepThree = (props: any) => {
  const { referrer, setReferrer, how, setHow, handleSubmit, isLoading } = props;
  return (
    <View flex={3} p="3" my="8">
      <Input label="Referral Code (Optional)" onChangeText={setReferrer} value={referrer} />
      <ReferralSelect label="How did you hear about us?" setValue={setHow} value={how} />
      <Button
        onPress={() => handleSubmit()}
        isLoading={isLoading}
        isLoadingText="Signing up"
        my="3"
        size="lg"
        py="4"
        _text={{
          width: '150%',
        }}
        fontSize="md"
        backgroundColor="CARDVESTGREEN"
        color="white">
        Continue
      </Button>
      <Text fontSize="2xs" textAlign="center">
        By clicking continue you agree to our terms and conditions.
      </Text>
    </View>
  );
};

const SignUp: FC = () => {
  const { mutate: createUser, isLoading } = useCreateUser();
  const navigation = useNavigation<GenericNavigationProps>();
  const [count, setCount] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referrer, setReferrer] = useState('');
  const [how, setHow] = useState('');
  const handleSubmit = async () => {
    try {
      await createUser({
        email,
        password,
        username,
        phonenumber: phoneNumber,
        terms: true,
        referrer,
        nationality: country,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center mt="20">
          <Text mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl" fontWeight="bold">
            Create Account
          </Text>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your details to get started
          </Text>
          <Center>
            <ProgressStepperIndicator isDisabled count={count} setCount={setCount} />
          </Center>
        </Center>
        {count === 1 && (
          <StepOne {...{ count, setCount, email, setEmail, password, setPassword, username, setUsername }} />
        )}
        {count === 2 && <StepTwo {...{ count, setCount, country, setCountry, phoneNumber, setPhoneNumber }} />}
        {count === 3 && <StepThree {...{ referrer, setReferrer, how, setHow, handleSubmit, isLoading }} />}
        <Center flex={1} px="4" justifyContent="space-between">
          <Pressable mt="2" w="100%" onPress={() => navigation.navigate('Login')}>
            <Text fontSize="md" textAlign="center" color="CARDVESTGREEN">
              Already have an account? <Text fontWeight={'bold'}>Login</Text>
            </Text>
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(SignUp);
