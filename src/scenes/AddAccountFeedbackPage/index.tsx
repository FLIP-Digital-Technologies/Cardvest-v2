import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const AddAccountFeedback: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <CSafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <SuccessFeedback
          title="Account Added"
          message="Your new withdrawal account has been
          added successfully"
          action={() => navigation.navigate('Withdraw')}
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(AddAccountFeedback);
