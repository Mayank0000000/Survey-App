import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,  
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  VStack, 
  useToast 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios'
import './Image.css';
import { BASE_URL as baseurl } from '../constants';

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageToBase64, setImageToBase64] = useState([])
  const toast = useToast();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const selectedFiles = files.slice(0, 4); 
  
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;      
        
        setImageToBase64(prev => [...prev, base64String]) 
       
        
        setSelectedImages((prevSelected) => [
          ...prevSelected,
          { file, preview: base64String },
        ]);
      };
    });
  };
  

  const handleSubmit = () => {
    const body = {
      title: title,
      description: description,
      images: imageToBase64
    }
    console.log(body)
    axios.post(`${baseurl}/api/add-images`, body)
    .then(response => {
      console.log('Server Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error.response);
    });
    toast({
      title: 'Data Submitted',
      description: 'Your data has been successfully submitted.',
      status: 'success',
      duration: 5000, 
      isClosable: true,
    });
    setSelectedImages([]);
    setTitle('');
    setDescription('')
   
  };

  const cleanupImagePreviews = () => {
    selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
  };

  useEffect(() => {
    return () => {
      cleanupImagePreviews();
    };
  }, [selectedImages]);

  return (
    <VStack spacing={6} align="center">
      <Box
        
        className='image-box '
      >
        <Input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <Input placeholder='Description' value={description}  onChange={e => setDescription(e.target.value)}/>
        <Stack spacing={3}>
          <Text  className='heading-upload'>Upload Images</Text>
          <Text color="gray.500">Select up to four images</Text>
        </Stack>
        <Box mt={6}>
          <label htmlFor="fileInput">
            <IconButton
              as="span"
              icon={<AddIcon />}
              fontSize="2xl"
              aria-label="Upload Images"
            />
          </label>
          <Input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            display="none"
            onChange={handleImageChange}
          />
        </Box>
        <Box mt={4}>
          {selectedImages.map((image, index) => (
            <Box key={index} display="inline-block" m={2}>
              <img
                src={image.preview}
                alt={`Preview ${index}`}                
                className='upload-container'
              />
            </Box>
          ))}
        </Box>
        <Button mt={6} colorScheme="teal" onClick={handleSubmit}>
          Upload Images
        </Button>
      </Box>
    </VStack>
  );
};

export default ImageUploader;
