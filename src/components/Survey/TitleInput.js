// TitleInput.js
import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const TitleInput = ({ register, errors }) => (
  <FormControl>
    <FormLabel>Title</FormLabel>
    <Input
      {...register('title', {
        required: 'Title is required',
        validate: (value) => value.trim() !== '' || 'Title is required',
      })}
      placeholder="Enter title"
    />
    {errors.title && <Text color="red">{`*${errors.title.message}`}</Text>}
  </FormControl>
);

export default TitleInput;
