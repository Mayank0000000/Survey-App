/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Box, Heading, Text, Button, Link, DrawerBody,DrawerCloseButton, DrawerHeader } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function VideoPublishReview({ survey, publish, surveyId, isDisabled }) {
  console.log(survey);

  return (
    <>
    <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px" fontSize="xl" fontWeight="bold">
                Video Details
            </DrawerHeader>
    
      <DrawerBody p={4}>
        <Heading mb={4}>{survey.title}</Heading>
        <Text mb={4}>{survey.description}</Text>
        <Box >
          {survey.videos.map((video, index) => (
            <Box key={index} mb={4}>
              <video
                controls
                width="100%"
                height="150px"
              >
                <source src={video} type="video/mp4" />
                
              </video>
            </Box>
          ))}
        </Box>
      </DrawerBody>
      {publish === 'Published' && (
        <Link href={`http://localhost:3002/${surveyId}`} target='_blank' mb='1rem'>
          Click here to give the test <ExternalLinkIcon mx='2px' />
        </Link>
      )}
      <RouterLink to={`/Video-Analytics/${surveyId}`}>
        <Button width='100%' isDisabled={isDisabled}>
          Analytics
        </Button>
      </RouterLink>
    </>
  );
}

export default VideoPublishReview;
