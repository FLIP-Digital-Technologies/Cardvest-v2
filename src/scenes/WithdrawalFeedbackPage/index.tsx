import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const WithdrawalFeedback: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Withdrawal Initiated"
          message="Your withdrawal request is being processed.
          You’ll get an update shortly."
          action={() => navigation.navigate('Dashboard')}
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(WithdrawalFeedback);
