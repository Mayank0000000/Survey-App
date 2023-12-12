import React from 'react';
import NavElement from './NavElement';
import { Box, Flex, VStack } from '@chakra-ui/react';
import './SideNav.css';
import { Icon } from '../../icons/Icons';

const Sidebar = () => {
  return (
    <Box
    as="nav"
    className="sidebar sidebar-bg-light"    
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
