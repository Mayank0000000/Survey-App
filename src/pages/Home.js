import React from 'react';
import { Flex, Spacer, Center, Square, Box, Text } from '@chakra-ui/react'

function Home() {
  return (
    <Flex gap='5rem'>
      <Box>
        <Text>Survey</Text>
       
      </Box>
     
      <Box>
        <Text>Images</Text>
      </Box>
      <Box>
        <Text>Videos</Text>
      </Box>
     
    </Flex>
  )
}

export default Home