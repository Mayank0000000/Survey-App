// SurveyResults.js
import React from 'react';
import { Box, Text, Badge, Divider, VStack, HStack } from '@chakra-ui/react';

const SurveyResults = ({ surveyResponses }) => {
  const uniqueQuestions = Array.from(
    new Set(surveyResponses.flatMap((response) => response.response.map((answer) => answer.question)))
  );
  const renderedOptions = new Set();

  return (
    <VStack spacing={4} align="stretch">
      {uniqueQuestions.map((question, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
            {question}
          </Text>
          {surveyResponses.map((response, idx) => {
            const answer = response.response.find((a) => a.question === question);
            if (answer && (answer.type === 'checkbox' || answer.type === 'radio')) {
              if (!renderedOptions.has(answer.answer)) {
                renderedOptions.add(answer.answer);
                const totalCount = surveyResponses.filter(
                  (res) => res.response.find((a) => a.question === question && a.answer === answer.answer)
                ).length;
                const percentage = (totalCount / surveyResponses.length) * 100;
                return (
                  <VStack
                    key={idx}
                    spacing={2}
                    align="stretch"
                    borderWidth="1px"
                    borderRadius="md"
                    p={3}
                    bgColor="gray.100"
                    mb='10px'
                  >
                    <HStack justifyContent="space-between">
                      <Text fontSize="sm" color="gray.500">
                        Submitted at: {new Date(response.submittedAt).toLocaleString()}
                      </Text>                     
                    </HStack>
                    <Box>
                      <Badge colorScheme="teal"> 
                        {answer.answer} - {percentage.toFixed(2)}%
                      </Badge>
                    </Box>
                  </VStack>
                );
              }
            } else if (answer) {
              return (
                <VStack key={idx} spacing={2} align="stretch" borderWidth="1px" borderRadius="md" p={3} bgColor="gray.100" mb='10px'>
                  <HStack justifyContent="space-between">
                    <Text fontSize="sm" color="gray.500">
                      Submitted at: {new Date(response.submittedAt).toLocaleString()}
                    </Text>                    
                  </HStack>
                  <Badge colorScheme="teal">
                    <Text>{answer.answer}</Text>
                  </Badge>
                </VStack>
              );
            }
            return null;
          })}
          <Divider my={4} />
        </Box>
      ))}
    </VStack>
  );
};

export default SurveyResults;
