import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Box, Text, Heading, Flex, Center } from '@chakra-ui/react';

function VideosResultsContainer({ userVideoData, index }) {
  const playerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleProgress = (state) => {
    const startTime = userVideoData.start_time;
    const endTime = userVideoData.end_time;
    const currentTime = state.playedSeconds;
    if (currentTime < startTime || currentTime >= endTime) {
      playerRef.current.seekTo(startTime);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Flex direction="column" align="center">
        <ReactPlayer
          ref={playerRef}
          url={userVideoData.response[currentVideoIndex]}
          controls={true}
          width="40%"
          height="auto"
          onProgress={handleProgress}
        />
        <Box mt={4} textAlign="center">
          <Heading as="h2" size="md" mb={2}>
            User: {index + 1}
          </Heading>
          
          <Text>
            Start Time: {userVideoData.start_time} seconds
          </Text>
          <Text>
            End Time: {userVideoData.end_time} seconds
          </Text>
          
        </Box>
      </Flex>
    </Box>
  );
}

export default VideosResultsContainer;
