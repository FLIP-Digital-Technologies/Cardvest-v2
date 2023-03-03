import { useLoginUser } from '@api/hooks/useAuth';
import { Bio, Logo } from '@assets/SVG';
import CSafeAreaView from '@components/CSafeAreaView';
import Input from '@components/Input';
import UseFingerprint from '@hooks/useFingerPrint';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { BoldText, validateEmail } from '@scenes/LoginPage';
import { useQueryClient } from '@tanstack/react-query';
import { cacheService } from '@utils/cache';
import { View, Text, Center, Button, Box, Pressable, ScrollView } from 'native-base';
import React, { FC, memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const LoginBack: FC = () => {
  const { mutate: loginUser, isLoading } = useLoginUser();
  const [data, setData] = useState();
  const navigation = useNavigation<GenericNavigationProps>();
  const queryClient = useQueryClient();
  const { showAuthenticationDialog } = UseFingerprint();
  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const res = await cacheService.get('user');
        setData(JSON.parse(res || {}));
        return res;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    try {
      await loginUser({
        email: data?.email,
        password,
      });
      // await navigation.navigate('Dashboard');
    } catch (error) {
      console.error(error);
    }
  };
  async function handleLogout() {
    await cacheService.del('login-user');
    await cacheService.del('user');
    await queryClient.setQueriesData(['user'], null);
    await queryClient.setQueriesData(['login-user'], null);
    await queryClient.invalidateQueries({ queryKey: ['login-user'] });
    await queryClient.invalidateQueries({ queryKey: ['user'] });
    await cacheService.clear();
    await queryClient.clear();
    await navigation.navigate('Login');
  }
  const handleDisabled = () => !data?.email || !password || isLoading || validateEmail(data?.email);
  return (
    <CSafeAreaView>
      <ScrollView
        _contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Center>
          <Box p="4" width={20} height={20}>
            <Logo />
          </Box>
          <BoldText mt="4" color="CARDVESTBLACK.50" textAlign="center" fontSize="xl">
            Welcome Back, {!data?.firstname && !data?.lastname && data?.username?.toString()}
            {data?.firstname && data?.lastname && data?.firstname?.toString()}
          </BoldText>
          <Text color="CARDVESTGREY.50" textAlign="center" fontSize="md" fontWeight="light">
            Enter your password to continue
          </Text>
        </Center>
        <View p="3">
          <Input type="password" label="Password" value={password} onChangeText={setPassword} />
        </View>
        <Center px="2">
          <Button
            onPress={() => handleSubmit()}
            isDisabled={handleDisabled()}
            my="3"
            width="95%"
            size="lg"
            p="4"
            isLoading={isLoading}
            isLoadingText="Logging in"
            fontSize="md"
            backgroundColor="CARDVESTGREEN"
            color="white">
            Login
          </Button>
          <Pressable w="100%" mt="2" onPress={() => handleLogout()}>
            <Text textAlign="center" fontSize="md" color="CARDVESTGREEN">
              <Text fontWeight={'bold'}>Sign Out</Text>
            </Text>
          </Pressable>
          <Pressable onPress={showAuthenticationDialog} mt="10" p="4" width={20} height={20}>
            <Bio />
          </Pressable>
        </Center>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(LoginBack);
