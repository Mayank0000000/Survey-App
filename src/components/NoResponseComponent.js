import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import './NoResponseComponent.css'

const NoResponseComponent = () => {
  return (
    <Box
     
      className='noresponse-container'
    >
      <Heading mb={4} color="red.500">
        Oops!
      </Heading>
      <Text fontSize="xl" textAlign="center">
        No response recorded yet
      </Text>
    </Box>
  );
};

export default NoResponseComponent;
