/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Box, Heading, Text, Button, Link,DrawerBody, DrawerHeader, DrawerCloseButton} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';


function ImagesPublishReview({ survey, publish, surveyId, isDisabled }) {
  console.log(survey);

  return (
    <>
    <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" fontSize="xl" fontWeight="bold">
                Image Details
            </DrawerHeader>
    <DrawerBody p={4}>
   
      <Heading mb={4}>{survey.title}</Heading>
      <Text mb={4}>{survey.description}</Text>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {survey.images.map((image, index) => (
          <Box key={index} mb={4} width={['100%', '48%']}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100px' }}
            />
          </Box>
        ))}
      </Box>
    </DrawerBody>
    {publish === 'Published' && <Link href={`http://localhost:3002/${surveyId}`} target='_blank' mb='1rem'>
                Click here to give the test <ExternalLinkIcon mx='2px' />
            </Link>}
            <RouterLink to={`/Image-Analytics/${surveyId}`}>
                <Button width='100%' isDisabled={isDisabled}>
                    Analytics
                </Button>
            </RouterLink>
    </>
    
  );
}

export default ImagesPublishReview;
