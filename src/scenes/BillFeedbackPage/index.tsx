import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const BillFeedbackPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Transaction Successful!"
          message=""
          action={() => navigation.navigate('Home')}
          actionText="Return to dashboard"
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(BillFeedbackPage);
