import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Spinner } from '@chakra-ui/react';
import QuestionSurvey from '../components/QuestionSurvey';
import Sidebar from '../components/Sidebar';
import './Home.css'
import { BASE_URL as baseurl } from '../constants';

function Home(props) {
  const [surveyData, setSurveyData] = useState([]);
  const [imageSurveyData, setImageSurveyData] = useState([]);
  const [videoSurveyData, setVideoSurveyData] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const SurveyData = () => {
    return fetch(`${baseurl}`)
      .then(response => response.json())
      .then(data => {
        setSurveyData(data);
        setDataLoaded(true)
      });
  };
  const ImageData = () => {
    return fetch(`${baseurl}/api/get-images`).then(res => res.json()).then(data => {
      setImageSurveyData(data)
      setDataLoaded(true)
    })
  }

  const VideoData = () => {
    return fetch(`${baseurl}/videos/get-videos`).then(res => res.json()).then(data => {
      setVideoSurveyData(data)
      setDataLoaded(true)
    })

  }
  useEffect(() => {
    SurveyData();
    ImageData();
    VideoData()
  }, []);

  const handleSurveyClick = survey => {
    setSelectedSurvey(survey);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Flex
      className="flex-container"
    >
      {/* Question Surveys Section */}
      <Box
        className="surveys-box"
        boxShadow="md"
      >
        <Box
          className="surveys-box-header"
        >
          <Text className="text-survey">
            Questions Survey
          </Text>
        </Box>
        <Flex className='content-survey' >
          {dataLoaded && surveyData.map(ele => (
            <QuestionSurvey
              key={ele._id}
              data={ele}
              onClick={() => handleSurveyClick(ele)}
              mb="3"
            />
          ))}
          {!dataLoaded && <Spinner />}
        </Flex>
      </Box>

      {/* Image Section */}
      <Box
        className="surveys-box"
        boxShadow="md"
      >
        <Box
          className="surveys-box-header"
        >
          <Text className="text-survey">
            Images Survey
          </Text>
        </Box>
        <Flex className='content-survey'>
          {dataLoaded && imageSurveyData.map(ele => (
            <QuestionSurvey
              key={ele._id}
              data={ele}
              onClick={() => handleSurveyClick(ele)}
              mb="3"
            />
          ))}
          {!dataLoaded && <Spinner />}
        </Flex>
      </Box>

      {/* Videos Section */}
      <Box
        className="surveys-box"
        boxShadow="md"
      >
        <Box
          className="surveys-box-header"
        >
          <Text className="text-survey">
            Videos Survey
          </Text>
        </Box>
        <Flex className='content-survey'>
          {dataLoaded && videoSurveyData.map(ele => (
            <QuestionSurvey
              key={ele._id}
              data={ele}
              onClick={() => handleSurveyClick(ele)}
              mb="3"
            />
          ))}
          {!dataLoaded && <Spinner />}
        </Flex>
      </Box>

      {isSidebarOpen && (
        <Sidebar survey={selectedSurvey} onClose={closeSidebar} />
      )}
    </Flex>
  );
}
export default Home;
