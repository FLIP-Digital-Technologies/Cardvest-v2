import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const SellGiftCardTradeFeedbackPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Transaction Processing"
          message="Your transaction has been submitted,
          and is being processed."
          action={() => navigation.navigate('Home')}
          actionText="Go to Dashboard"
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(SellGiftCardTradeFeedbackPage);
