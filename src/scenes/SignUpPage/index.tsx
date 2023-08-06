import { useCreateUser } from '@api/hooks/useAuth';
import { GHS, NGN, RadioChecked, RadioUnChecked } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { ProgressStepperIndicator } from '@scenes/KYCPage';
import { BoldText, validateEmail } from '@scenes/LoginPage';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Select,
  Text,
  View,
} from 'native-base';
import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import { SvgUri } from 'react-native-svg';

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
                  How did you hear about us?
                </Text>
              </HStack>
            }
          />
          <Select.Item label="Referral" value="Referral" />
          <Select.Item label="From a friend/colleague" value="From a friend/colleague" />
          <Select.Item label="Social media" value="Social media" />
          <Select.Item label="Search engine" value="Search engine" />
          <Select.Item label="Others" value="Others" />
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
            value=""
            _disabled={{ opacity: 1 }}
            startIcon={
              <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color="CARDVESTGREEN">
                  Select Country
                </Text>
              </HStack>
            }
          />
          <Select.Item
            label="Nigeria"
            value="Nigeria"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <NGN />
                  <Text>Nigeria</Text>
                </HStack>
                {value === 'Nigeria' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
          <Select.Item
            label="Ghana"
            value="Ghana"
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack w="12" mx="-3" h="7" alignItems="center">
                  <GHS />
                  <Text> Ghana</Text>
                </HStack>
                {value === 'Ghana' ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
        </Select>
      </Box>
    </Box>
  );
};

const SelectItem = memo(({ value, item, setValue }: any) => {
  const active = value === item.value;
  return (
    <Pressable p={3} onPress={() => setValue(item.value)}>
      <HStack flex={1} py="2" justifyContent="space-between" alignItems="center">
        <HStack h="7" space="2" alignItems="center">
          {!!item?.img && (
            <View h="7" w="7" rounded={'full'} position={'relative'} overflow="hidden">
              <SvgUri uri={item.img} style={{ borderRadius: 99999 }} height="100%" width="100%" />
            </View>
          )}
          <Text>{item.label}</Text>
        </HStack>
        {active ? (
          <View w="6" h="5">
            <RadioChecked />
          </View>
        ) : (
          <View w="6" h="5">
            <RadioUnChecked />
          </View>
        )}
      </HStack>
    </Pressable>
  );
});

export const SelectComponent = ({
  value,
  setValue,
  label = '',
  options = [],
  loading = false,
  loadingText = 'Loading',
  isDisabled = false,
  placeholder = 'Select',
  searchable = false,
}: any) => {
  const [showOptions, setShowOptions] = useState(false);

  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (q: string) => {
      if (!searchable) return;
      setSearchQuery(q);
      search(q);
    },
    [setSearchQuery, search, searchable],
  );

  function toggleShowOptions() {
    if (isDisabled) return;
    setShowOptions(!showOptions);
  }

  async function search(q: string) {
    const results: { label: string }[] = [];
    if (q) {
      options.forEach((item: { label: string }) => {
        if (item.label.toLowerCase().includes(q.toLowerCase())) {
          results.push(item);
        }
      });
      setDisplayedOptions(results as any);
    } else {
      setDisplayedOptions(options);
    }
  }

  return (
    <Box>
      <Pressable onPress={toggleShowOptions} position={'relative'}>
        <View top={0} bottom={0} right={0} left={0} opacity={0} position={'absolute'} zIndex={1} />
        <NBSelectComponent
          label={label}
          loading={loading}
          loadingText={loadingText}
          placeholder={placeholder}
          value={value}
          setValue={setValue}
          options={options}
        />
      </Pressable>
      <Actionsheet isOpen={showOptions} onClose={toggleShowOptions}>
        <Actionsheet.Content
          flexDirection={'column'}
          alignItems={'stretch'}
          h={options.length > 5 ? '2xl' : 'md'}
          mt="auto">
          {searchable ? (
            <View w="100%" p="0" h="auto">
              <Input value={searchQuery} onChangeText={handleSearch} placeholder="Search item" />
            </View>
          ) : null}
          <FlatList
            flex={1}
            contentContainerStyle={{
              alignItems: 'stretch',
            }}
            keyExtractor={(item: any) => item.value}
            data={displayedOptions.length ? displayedOptions : options}
            renderItem={({ item }: any) => (
              <SelectItem
                value={value}
                item={item}
                setValue={(val: any) => {
                  setValue(val);
                  toggleShowOptions();
                }}
              />
            )}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

const MemoizedSelect = memo(
  ({
    searchable,
    isDisabled,
    loading,
    value,
    label,
    loadingText,
    placeholder,
    setValue,
    // displayedOptions,
    setDisplayedOptions,
    options,
  }: any) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [displayedPlaceholder, setDisplayedPlaceholder] = useState(placeholder);

    const handleSearch = useCallback(
      (q: string) => {
        if (!searchable) return;
        setSearchQuery(q);
        search(q);
      },
      [setSearchQuery, search, searchable],
    );

    async function search(q: string) {
      const results: { label: string }[] = [];
      if (q) {
        options.forEach((item: { label: string }) => {
          if (item.label.toLowerCase().includes(q.toLowerCase())) {
            results.push(item);
          }
        });
        setDisplayedOptions(results as any);
      } else {
        setDisplayedOptions(options);
      }
    }

    const NBSelectSearchBar = useMemo(
      () =>
        ({ handleSearch }: any) =>
          (
            <View w="100%" p="0" h="auto">
              <Input
                value={searchQuery}
                onChangeText={handleSearch}
                placeholder="Search item"
                keyboardType="web-search"
              />
            </View>
          ),
      [handleSearch],
    );

    return (
      <Select
        isDisabled={isDisabled || loading}
        selectedValue={value}
        minWidth="200"
        accessibilityLabel={label}
        placeholder={loading ? loadingText : displayedPlaceholder}
        borderColor="#F7F9FB"
        _selectedItem={{
          bg: '#F7F2DD',
          endIcon: <CheckIcon size="5" />,
        }}
        _actionSheetBody={{
          ListHeaderComponent: searchable ? <NBSelectSearchBar handleSearch={handleSearch} /> : null,
        }}
        height="50px"
        fontSize="md"
        onValueChange={(itemValue: string) => setValue(itemValue)}>
        <Select.Item
          isDisabled
          label={placeholder}
          value=""
          _disabled={{ opacity: 1 }}
          startIcon={
            <HStack position="relative" w="100%" justifyContent="space-between" alignItems="center">
              <Text fontSize="md" color="CARDVESTGREEN">
                {placeholder}
              </Text>
            </HStack>
          }
        />
        {options.map((item: any, i: number) => (
          <Select.Item
            key={i}
            label={item.label}
            value={item.value}
            startIcon={
              <HStack w="100%" justifyContent="space-between" alignItems="center">
                <HStack mx="-3" h="7" space="5" alignItems="center">
                  {!!item?.img && (
                    <View h="7" w="7" rounded={'full'} overflow="hidden">
                      <SvgUri uri={item.img} style={{ borderRadius: 99999 }} height="100%" width="100%" />
                    </View>
                  )}
                  <Text>{item.label}</Text>
                </HStack>
                {value === item.value ? (
                  <View w="6" h="5">
                    <RadioChecked />
                  </View>
                ) : (
                  <View w="6" h="5">
                    <RadioUnChecked />
                  </View>
                )}
              </HStack>
            }
          />
        ))}
      </Select>
    );
  },
);

export const NBSelectComponent = ({
  value,
  setValue,
  label = '',
  options = [],
  loading = false,
  loadingText = 'Loading',
  isDisabled = false,
  placeholder = 'Select',
  searchable = false,
}: any) => {
  const [displayedOptions, setDisplayedOptions] = useState(options);

  return (
    <Box>
      <Box my="2">
        {label && (
          <Text mb="2" color="CARDVESTGREY.400" fontWeight={'light'}>
            {label}
          </Text>
        )}
        <Box backgroundColor="#F7F9FB">
          <MemoizedSelect
            {...{
              options,
              setDisplayedOptions,
              searchable,
              isDisabled,
              loading,
              value,
              label,
              loadingText,
              placeholder,
              setValue,
              displayedOptions,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const StepOne = (props: any) => {
  const { count, setCount, email, setEmail, password, setPassword, username, setUsername } = props;
  const handleDisabled = () => !email || !password || !username || validateEmail(email);
  return (
    <View p="3" my="6">
      <Input label="Username" value={username} onChangeText={setUsername} />
      <Input label="Email Address" value={email} onChangeText={setEmail} />
      <Input type="password" label="Password" value={password} onChangeText={setPassword} />
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
    <View p="3" my="6">
      <CountrySelect label="Country" value={country} setValue={setCountry} />
      <Input label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} />
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
    <View p="3" my="8">
      <Input label="Referral Code (Optional)" onChangeText={setReferrer} value={referrer} />
      <ReferralSelect label="How did you hear about us?" setValue={setHow} value={how} />
      <Button
        onPress={() => handleSubmit()}
        isLoading={isLoading}
        isLoadingText="Signing up"
        my="3"
        size="lg"
        py="4"
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
      console.error('create user ', error);
    }
  };
  const handleDisabled = useCallback(() => {
    switch (count) {
      case 2:
        return !email || !password || !username || validateEmail(email);
      case 3:
        return (
          !phoneNumber ||
          !country ||
          (country === 'Nigeria' && phoneNumber.length !== 11) ||
          (country === 'Ghana' && phoneNumber.length !== 9)
        );
      default:
        return false;
    }
  }, [count, country, phoneNumber, email, password, username]);
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center mt="-24">
          <BoldText mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="3xl">
            Create Account
          </BoldText>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your details to get started
          </Text>
          <Center>
            <ProgressStepperIndicator count={count} setCount={setCount} />
          </Center>
        </Center>
        {count === 1 && (
          <StepOne {...{ count, setCount, email, setEmail, password, setPassword, username, setUsername }} />
        )}
        {count === 2 && <StepTwo {...{ count, setCount, country, setCountry, phoneNumber, setPhoneNumber }} />}
        {count === 3 && <StepThree {...{ referrer, setReferrer, how, setHow, handleSubmit, isLoading }} />}
        <Center px="2">
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
