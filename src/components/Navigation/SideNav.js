import React from 'react';
import NavElement from './NavElement';
import { Box, Flex, VStack, useColorModeValue} from '@chakra-ui/react';


const SideNav = () => {

  const bgColor = useColorModeValue('white', 'blue.800');
  const color = useColorModeValue('black', 'white');


  return (
    <Box
      as="nav"
      pos="fixed"
      top="75px"
      left="50px"
      h="100vh"
      w="60px"
      bg={bgColor}
      color={color}
      p="8"
      display={{ base: 'none', md: 'block' }}
    >
      <Flex direction="column">
        <VStack spacing="4">
          <NavElement />
        </VStack>
      </Flex>
    </Box>
  );
};

export default SideNav;
