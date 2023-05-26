/* eslint-disable prettier/prettier */
import { initialize, setCustomUserId } from 'react-native-clarity';

export default class Clarity {
  static initialize() {
    initialize('h9fj4uo65k');
  }

  static setUserId(userId: string) {
    setCustomUserId(userId);
  }
}
