import React, {useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Text,
    VStack,
    Heading,
    Divider,
    Button,
    Link
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import './SurveyPreview.css'


function SurveyPreview({ survey, publish, surveyId, isDisabled }) {   
    console.log(isDisabled)
    
      
    return (
        <>
            <DrawerCloseButton />
            <DrawerHeader  className='header-preview'>
                Survey Details
            </DrawerHeader>
            <DrawerBody>
                {survey && (
                    <>
                        <Heading size="lg" mb="2">
                            {survey.title}
                        </Heading>
                        {survey.questions.map((ele, i) => (
                            <VStack key={i} align="start" spacing="2">
                                <Text color="teal.300" className='question-survey'>
                                    Q.{i + 1}  {ele.question}
                                </Text>
                                {ele.options.map((curr, j) => (
                                    <Text key={j + 1} color="gray.400">
                                        {j + 1}.  {curr.name}
                                    </Text>
                                ))}
                                {i < survey.questions.length - 1 && (
                                    <Divider borderColor="gray.600" />
                                )}
                            </VStack>
                        ))}
                    </>
                )}
            </DrawerBody>
            {publish === 'Published' && <Link href={`http://localhost:3002/${surveyId}`} target='_blank'>
                Click here to give the test <ExternalLinkIcon mx='2px' />
            </Link>}
            <RouterLink to={`/Analytics/${surveyId}`}>
                <Button mt='1rem' width='100%' isDisabled={isDisabled}>
                    Analytics
                </Button>
            </RouterLink>
        </>
    )
}

export default SurveyPreview;

