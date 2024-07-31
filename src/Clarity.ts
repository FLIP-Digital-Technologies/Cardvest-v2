import { initialize, setCustomUserId } from 'react-native-clarity';

export default class Clarity {
  static initialize() {
    initialize('ko6l66owl2');
  }

  static setUserId(userId: string) {
    setCustomUserId(userId);
  }
}
