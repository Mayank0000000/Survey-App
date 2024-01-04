
import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const DescriptionInput = ({ register, errors }) => (
  <FormControl>
    <FormLabel>Description</FormLabel>
    <Input
      {...register('description', {
        required: 'Description is required',
        validate: (value) => value.trim() !== '' || 'Description is required',
      })}
      placeholder="Enter description"
    />
    {errors.description && (
      <Text color="red">{`*${errors.description.message}`}</Text>
    )}
  </FormControl>
);

export default DescriptionInput;
