// import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Text, View, Radio, TextArea } from 'native-base';
import React, { FC, memo, useState } from 'react';

const DeleteAccountPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  return (
    <BackButtonTitleCenter
      action={() => navigation.navigate('DeleteAccountFeedback')}
      // isLoading={isLoading}
      // isDisabled={handleDisabled()}
      title="Delete Account"
      actionText="Continue">
      <View my="7">
        <Text fontSize="md" fontWeight="200">
          Can you please share with us why you wish to deactivate your CardVest account?
        </Text>
        <View mt="8" mb="4">
          <Radio.Group
            defaultValue="1"
            name="myRadioGroup"
            accessibilityLabel="Pick your favorite number"
            value={reason}
            onChange={nextValue => {
              setReason(nextValue);
            }}>
            <Radio size="sm" value="I don't like the app" my={3}>
              {' '}
              I don't like the app
            </Radio>
            <Radio size="sm" value="It doesn't do what I need it to do." my={3}>
              {' '}
              It doesn't do what I need it to do.
            </Radio>
            <Radio size="sm" value="It doesn't support my country." my={3}>
              {' '}
              It doesn't support my country.
            </Radio>
            <Radio size="sm" value="I no longer need the app." my={3}>
              {' '}
              I no longer need the app.
            </Radio>
            <Radio size="sm" value="other" my={3}>
              {' '}
              Other
            </Radio>
          </Radio.Group>
        </View>
        {reason === 'other' && (
          <View mt="4">
            <TextArea
              autoCompleteType
              value={otherReason}
              onChangeText={setOtherReason}
              h="300"
              _focus={{
                backgroundColor: '#fff',
                padding: 5,
              }}
            />
          </View>
        )}
        {/* <FormSelect
          label="Select Network"
          value={network}
          setValue={setNetwork}
          data={proviDate?.data?.map((item: any) => ({ name: item?.name, id: item?.product }))}
        />
        <View p="3" />
        <Input label="Amount" value={amount?.toString()} onChangeText={setAmount} />
        <View p="3" />
        <Input label="Mobile Number" value={phoneNumber} onChangeText={setPhoneNumber} /> */}
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(DeleteAccountPage);
