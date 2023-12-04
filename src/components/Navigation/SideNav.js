// Sidebar.js

import React from 'react';
import NavElement from './NavElement';
import { Box, Flex, VStack, useColorModeValue } from '@chakra-ui/react';

import { Icon } from '../../icons/Icons';

const Sidebar = () => {

  const bgColor = useColorModeValue('white', 'blue.800');
  const color = useColorModeValue('black', 'white');

  return (
    <Box
      as="nav"
      // pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="200px"
      bg={bgColor}
      color={color}
      boxShadow='lg'
      p="4"
      // display={{ base: 'none', md: 'block' }}      
      // Add margin to the right to avoid overlapping with the top navigation
      mr={{ base: '0', md: '4' }}
    >

      <Flex direction="column">
        <VStack spacing="4">
          <Icon />
          <NavElement />
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
