// import TextArea from '@components/TextArea';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Text, View, Radio, TextArea } from 'native-base';
import React, { FC, memo, useState } from 'react';

const DeleteAccountPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [reason, setReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState('');
  const handleDisabled = () => (reason === 'other' ? !otherReason : !reason);
  return (
    <BackButtonTitleCenter
      action={() => navigation.navigate('DeleteAccountFeedback')}
      // isLoading={isLoading}
      isDisabled={handleDisabled()}
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
            <Radio size="sm" value="I don't like your rates" my={3}>
              {' '}
              I don't like your rates
            </Radio>
            <Radio size="sm" value="Your app is too stressful for me" my={3}>
              {' '}
              Your app is too stressful for me
            </Radio>
            <Radio size="sm" value="Your app is malfunctioning" my={3}>
              {' '}
              Your app is malfunctioning
            </Radio>
            <Radio size="sm" value="You don't support the gift card I want to trade" my={3}>
              {' '}
              You don't support the gift card I want to trade
            </Radio>
            <Radio size="sm" value="Unresponsive customer support" my={3}>
              {' '}
              Unresponsive customer support
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
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(DeleteAccountPage);
