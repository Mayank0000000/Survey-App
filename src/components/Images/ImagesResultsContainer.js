import React from 'react';
import { Box, Flex, Image, Divider, Text } from '@chakra-ui/react';

function ImagesResultsContainer({ data }) {
  console.log(data);

  return (
    <Flex wrap="wrap" justifyContent="center" flexDirection='column' alignItems="center" mt='20px'>
        
      {data.surveyResponses?.map((curr, index) => (
        <Box key={curr._id}>
          <Text fontSize="xl" fontWeight="bold" mb="2">
            Survey #{index + 1} Results
          </Text>
          <Flex flexDirection='row' alignItems="center">
            {curr.response.map((ele, subIndex) => (
              <Box key={`${curr._id}_${subIndex}`} m="2">
                <Image
                  src={ele}
                  alt={`Image ${subIndex + 1}`}
                  boxSize="200px"
                  objectFit="cover"
                  borderRadius="md"
                  boxShadow="lg"
                />
                <Text mt="2" textAlign="center">
                  Image {subIndex + 1}
                </Text>
              </Box>
            ))}
          </Flex>
          {index < data.surveyResponses.length - 1 && <Divider my="4" />}
        </Box>
      ))}
    </Flex>
  );
}

export default ImagesResultsContainer;
