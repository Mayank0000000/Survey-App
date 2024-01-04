
import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import SurveyResults from './SurveyResults';
import { useParams } from 'react-router-dom';
import NoResponseComponent from './NoResponseComponent';

const SurveyResultsContainer = () => {
  const [surveyData, setSurveyData] = useState(null);
  const id = useParams();
  
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:3001/get-Survey/${id.id}`)
      .then((res) => res.json())
      .then((data) => setSurveyData(data))
      .catch((error) => console.error('Error fetching survey data:', error));
  };
  

  return (
    <Box p={8}>
      <Heading mb={4} textAlign="center">
        Survey Results
      </Heading>
      {surveyData ? (
        <SurveyResults surveyResponses={surveyData.surveyResponses} />
      ) : (
        <Box textAlign="center">
          <Spinner size="lg" />
          <p>Loading survey data...</p>
        </Box>
      )}
      {surveyData?.surveyResponses.length === 0 && <NoResponseComponent/>}
    </Box>
  );
};

export default SurveyResultsContainer;
