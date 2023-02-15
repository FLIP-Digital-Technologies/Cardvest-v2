import CSafeAreaView from '@components/CSafeAreaView';
import { SuccessFeedback } from '@components/Feedback';
import { useNavigation, StackActions } from '@react-navigation/native';
import { View } from 'native-base';
import React, { FC, memo } from 'react';

const AddAccountFeedback: FC = () => {
  const navigation = useNavigation();
  const popAction = StackActions.pop(2);
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
          action={() => navigation.dispatch(popAction)}
        />
      </View>
    </CSafeAreaView>
  );
};

export default memo(AddAccountFeedback);
