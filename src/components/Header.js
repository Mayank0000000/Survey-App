import React from 'react';
import { Flex, Spacer } from '@chakra-ui/react';
import { Icon, Profile } from '../icons/Icons';

function Header() {
  return (
    <Flex alignItems='center' marginLeft='30px' marginRight='30px'>
      <Icon />
      <Spacer />
      <Profile />
    </Flex>
  )
}

export default Header