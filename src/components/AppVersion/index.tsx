// import env from '@env';
import env from '@env';
import { Flex, Text } from 'native-base';
import React, { FC } from 'react';

const EnvInfoView: FC = () => {
  return (
    <Flex marginTop={5}>
      {/* This is just to show you how to get values from the generated ENV file */}
      <Text fontSize="2xs" textAlign="center" paddingY="5px" color="ASBESTOS">{`ENV: ${env.ENV}`}</Text>

    </Flex>
  );
};

export default EnvInfoView;
