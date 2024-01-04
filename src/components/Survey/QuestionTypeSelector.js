// QuestionTypeSelector.js
import React from 'react';
import { FormControl, FormLabel, Stack, Button, Text } from '@chakra-ui/react';

const QuestionTypeSelector = ({ setQuestionTypeHandler, errors }) => (
  <FormControl isInvalid={errors.questionType}>
    <FormLabel>Select Question Type</FormLabel>
    <Stack direction="row">
      {['input', 'checkbox', 'radio'].map((val, i) => (
        <Button key={i} onClick={() => setQuestionTypeHandler(val)}>
          {val}
        </Button>
      ))}
    </Stack>
    {errors.questionType && (
      <Text color="red">{`*${errors.questionType.message}`}</Text>
    )}
  </FormControl>
);

export default QuestionTypeSelector;
