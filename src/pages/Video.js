import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack  
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import './Image.css'
import { BASE_URL as baseurl } from '../constants';

const VideoUploader = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoToBase64, setVideoToBase64] = useState('');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result;

      setVideoToBase64(base64String);
      setSelectedVideo({ file, preview: base64String });
    };
  };

  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      videos: videoToBase64,
    };
    console.log(body)
    axios.post(`${baseurl}/videos/add-videos`, body)
    .then(response => {
      console.log('Server Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response);
    });  
    
  };

  const cleanupVideoPreview = () => {
    if (selectedVideo) {
      URL.revokeObjectURL(selectedVideo.preview);
    }
  };

  useEffect(() => {
    return () => {
      cleanupVideoPreview();
    };
  }, [selectedVideo]);
  

  return (
    <VStack spacing={6} align="center">
      <Box
      
        className='image-box '
      >
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Stack spacing={3}>
        <Text  className='heading-upload'>Upload a Video</Text>
          <Text color="gray.500">Select a single video file</Text>
        </Stack>
        <Box mt={6}>
          <label htmlFor="videoInput">
            <IconButton
              as="span"
              icon={<AddIcon />}
              fontSize="2xl"
              aria-label="Upload Video"
            />
          </label>
          <Input
            id="videoInput"
            type="file"
            accept="video/*"
            multiple={false}
            display="none"
            onChange={handleVideoChange}
          />
        </Box>
        <Box mt={4}>
          {selectedVideo && (
            <Box display="inline-block" m={2}>
              <video
                controls
                src={videoToBase64}
                alt="Video Preview"               
                className='video-preview-container'
              />
            </Box>
          )}
        </Box>
        <Button mt={6} colorScheme="teal" onClick={handleSubmit}>
          Upload Video
        </Button>
      </Box>
    </VStack>
  );
};

export default VideoUploader;
