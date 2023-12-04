import React, { useState, useRef } from 'react';
import {
  ChakraProvider,
  Box,
  FormControl,
  FormLabel,
  Input,  
  Button,
  Stack,
} from '@chakra-ui/react';

const Survey = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState([]); 
  const [jsonData, setJsonData] = useState()

  const jsonDataRef = useRef({
    survey_block: {
      title: 'Dynamic Survey Generation',
      description: '',
      questions: [],
    },
  });
 

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

 const optionsTotal = options.map((ele) => {
  return {
    id: Date.now(),
    name: ele    
  }
 })

  const handleSubmit = () => {
    const data = {
      id: Date.now(),
      type: questionType,
      question: questionText,
      options: optionsTotal  
    }  
    // const jsonData = {
    //   survey_block: {
    //     "title": "Dynamic Survey Generation",
    //     "description": "",
    //     "questions": [

    //     ]
    //   }
    // };
    // jsonData.survey_block.questions.push(data)  
    //  console.log(jsonData);
    jsonDataRef.current.survey_block.questions.push(data);
   console.log(jsonDataRef.current)
    setOptions([])
    setQuestionType('')
  };

 
 
  return (
    <ChakraProvider>
      <Box p={5}>
        <Stack spacing={3}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Enter form title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              placeholder="Enter form description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Select Question Type</FormLabel>
            <Stack direction="row">
              <Button onClick={() => setQuestionType('input')}>Input</Button>
              <Button onClick={() => setQuestionType('checkbox')}>
                Checkbox
              </Button>
              <Button onClick={() => setQuestionType('radio')}>Radio</Button>
            </Stack>
          </FormControl>

          {questionType && (
            <FormControl>
              <Input
                placeholder={`Enter ${questionType} question`}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
              />
              {options.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
              <Button onClick={handleAddOption}>Add Option</Button>
            </FormControl>
          )}       

          <Button colorScheme="teal" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
    </ChakraProvider>
  );
};

export default Survey;
