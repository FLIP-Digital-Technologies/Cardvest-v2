import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const FundAccountFeedback: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Funding Successful!"
          message="Your NGN wallet has been funded
          with NGN 200,000.00 successfully"
          action={() => navigation.navigate('Wallets')}
          actionText="Return to Wallets"
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(FundAccountFeedback);
