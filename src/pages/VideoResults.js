import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoResultsContainer from '../components/Videos/VideosResultsContainer';
import { Flex, Text, Spinner } from '@chakra-ui/react'; 
import NoResponseComponent from '../components/NoResponseComponent';
import './VideoResults.css'
import { BASE_URL as baseurl } from '../constants';

function VideoResults() {
  const [surveyData, setSurveyData] = useState(null);
  const id = useParams();

  
  const fetchData = () => {
    fetch(`${baseurl}/video-test/get-test-video/${id.id}`)
      .then((res) => res.json())
      .then((data) => setSurveyData(data))
      .catch((error) => console.error('Error fetching survey data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);
 

  return (
    <>
    <Flex className='video-results'>
      <Text className='total-response'>Total Responses: { surveyData?.surveyResponses.length }</Text>

      {surveyData &&
        surveyData.surveyResponses.map((curr,i) => {
          return (
            <VideoResultsContainer userVideoData={curr} key={curr._id} index={i} />
          );
        })}
    </Flex>
    {!surveyData && <Spinner/>}
    {surveyData?.surveyResponses.length === 0 && <NoResponseComponent/>}
    </>
  );
}

export default VideoResults;
