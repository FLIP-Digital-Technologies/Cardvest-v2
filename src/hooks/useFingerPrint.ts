import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { cacheService } from '@utils/cache';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const UseFingerprint = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const [biometryType, setBiometryType] = useState<any>();
  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(biometryRep => {
        setBiometryType(biometryRep);
      })
      .catch(error => console.log('isSensorAvailable error => ', error));
  }, []);

  const getMessage = () => {
    if (biometryType === 'Face ID') {
      return 'Scan your Face on the device to continue';
    } else {
      return 'Scan your Fingerprint on the device scanner to continue';
    }
  };

  const showAuthenticationDialog = () => {
    if (biometryType !== null && biometryType !== undefined) {
      FingerprintScanner.authenticate({
        description: getMessage(),
      })
        .then(async () => {
          //you can write your logic here to what will happen on successful authentication
          console.log('noy');
          try {
            const toks = await cacheService.get('login-user');
            if (toks.length > 0) {
              navigation.navigate('Dashboard');
            } else {
              Alert.alert('Please Login with your email and password?');
            }
          } catch (error) {
            return false;
          }
        })
        .catch(error => {
          console.log('Authentication error is => ', error);
        });
    } else {
      console.log('biometric authentication is not available');
    }
  };

  return {
    biometryType,
    getMessage,
    showAuthenticationDialog,
  };
};

export default UseFingerprint;
