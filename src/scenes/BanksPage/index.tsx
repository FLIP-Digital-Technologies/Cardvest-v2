import { useDeleteBankAccount, useGetUserBank } from '@api/hooks/useBankAccounts';
import { AddGreen, Delete, BankCircle, Success, RedTrash, BanksEmpty } from '@assets/SVG';
import CLoader from '@components/CLoader';
import Input from '@components/Input';
import { DelectAccountModal } from '@components/TransactionPinModal';
import BackButtonTitleCenter from '@components/Wrappers/BackButtonTitleCenter';
import { useCurrency } from '@hooks/useCurrency';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { EmptyPanel } from '@scenes/DashboardPage';
import { HStack, Text, View, VStack, Pressable } from 'native-base';
import React, { FC, memo } from 'react';

const BankAccount = ({ data }: { data: any }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { mutate: deleteBankAccount, isLoading } = useDeleteBankAccount();
  const handleDelete = async (bank_id: any) => {
    try {
      await deleteBankAccount({
        bank_id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {modalVisible && (
        <DelectAccountModal
          {...{
            modalVisible,
            delectAction: () => handleDelete(data?.id),
            closeModalVisible: () => setModalVisible(false),
            isLoading,
          }}
        />
      )}
      <HStack px="3" py="4" my="2" background={'#F9F9F9'} alignItems="center" justifyContent="space-between">
        <HStack alignItems="center">
          <View h="30px" w="30px">
            <BankCircle />
          </View>
          <VStack px="2">
            <Text fontSize="xs">{data?.accountname}</Text>
            <Text fontSize="2xs" color="CARDVESTGREY.100">
              {data?.bankname} - {data?.banknumber}
            </Text>
          </VStack>
        </HStack>
        <Pressable h="5" w="5" onPress={() => setModalVisible(true)}>
          <RedTrash />
        </Pressable>
      </HStack>
    </>
  );
};

const BanksPage: FC = () => {
  const navigation = useNavigation<GenericNavigationProps>();
  const { currency } = useCurrency();
  const { data, isFetching } = useGetUserBank(currency);
  if (isFetching) return <CLoader />;
  return (
    <BackButtonTitleCenter title="Accounts">
      <View mb="7" h="full">
        <VStack w="100%">
          {data?.data?.length === 0 ? (
            <View justifyContent="center" alignItems="center" mt="160">
              <EmptyPanel Icon={BanksEmpty} title="" body="You have not added any bank account yet." />
            </View>
          ) : (
            data?.data?.map((item: any, index: number) => {
              return <BankAccount data={item} key={index} />;
            })
          )}
        </VStack>
        <View p="3" />
        <Pressable onPress={() => navigation.navigate('AddAccount')}>
          <HStack alignItems="center" justifyContent="center">
            <View w="6" h="6">
              <AddGreen />
            </View>
            <Text mx="2" color="CARDVESTGREEN">
              Add new bank account
            </Text>
          </HStack>
        </Pressable>
      </View>
    </BackButtonTitleCenter>
  );
};

export default memo(BanksPage);
