import { useEffect, useRef, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

const useKeyboardBottomInset = (): number => {
  const [bottom, setBottom] = useState(0);
  const subscriptions = useRef<any>([]);

  useEffect(() => {
    console.log('bottom val', bottom);

    function onKeyboardChange(e: any) {
      if (e.endCoordinates.screenY > 0) {
        setBottom(e.endCoordinates.height);
      } else setBottom(0);
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange)];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach((subscription: any) => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};

export default useKeyboardBottomInset;
