import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react'
import './QuestionsSurvey.css'

function QuestionSurvey(props) {    
  return (
    <Box
    className='question-survey-container'
    maxW="sm"     
      boxShadow={"md"}      
      onClick={props.onClick}
    >
      <Heading as="h3" size="md" mb="2">
        {props.data.title}
      </Heading>
      <Text>{props.data.description}</Text>
    </Box>
  )
}

export default QuestionSurvey