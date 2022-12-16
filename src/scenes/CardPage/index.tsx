import { AddGreen, Delete, MasterCard, Success } from '@assets/SVG';
import Input from '@components/Input';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { HStack, Text, View, VStack } from 'native-base';
import React, { FC, memo } from 'react';
import { Pressable } from 'react-native';

const Card = ({ selected }: { selected?: boolean }) => {
  return (
    <HStack
      p="2"
      my="2"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor={selected ? 'CARDVESTGREY.500' : ''}>
      <HStack alignItems="center">
        <View h="70" w="89">
          <MasterCard />
        </View>
        <VStack px="2">
          <Text fontSize="lg">Card Name</Text>
          <Text fontSize="sm" color="CARDVESTGREY.100">
            1234 **** **** 7890
          </Text>
        </VStack>
      </HStack>
      {selected && (
        <View h="10" w="10">
          <Success />
        </View>
      )}
      {!selected && (
        <View h="7" w="10">
          <Delete />
        </View>
      )}
    </HStack>
  );
};

const CardPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  return (
    <BackButtonTitleCenter title="Cards">
      <View my="7">
        <Text fontSize="lg">Select Card</Text>
        <Text fontSize="sm" color="CARDVESTGREY.100" fontWeight="light">
          We accept all major debit cards
        </Text>
        <View p="3" />
        <VStack>
          <Card selected />
          <Card />
          <Card />
        </VStack>
        <View p="3" />
        <Pressable onPress={() => navigation.navigate('AddAccount')}>
          <HStack alignItems="center" justifyContent="center">
            <View w="6" h="6">
              <AddGreen />
            </View>
            <Text mx="2" color="CARDVESTGREEN">
              Add new card
            </Text>
          </HStack>
        </Pressable>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(CardPage);
