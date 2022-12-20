import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const BuyGiftCardTradeFeedbackPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Order Placed"
          message="Your order has been placed successfully.
          You’ll be updated shortly."
          action={() => navigation.navigate('Dashboard')}
          actionText="Go to Dashboard"
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(BuyGiftCardTradeFeedbackPage);
