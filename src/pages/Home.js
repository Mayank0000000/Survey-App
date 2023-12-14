import React, { useEffect } from 'react';
import { Flex, Spacer, Center, Square, Box, Text } from '@chakra-ui/react'

function Home() {


 const apiData = () => {
  return fetch('http://localhost:3001').then(response => response.json()).then(data => console.log(data))
 }

  useEffect(() => {
    apiData()
  },[])
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

export default Home;