import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ImagesResultsContainer from '../components/Images/ImagesResultsContainer';
import NoResponseComponent from '../components/NoResponseComponent';
import { BASE_URL as baseurl } from '../constants';
import { Text, Spinner } from '@chakra-ui/react'; 
import './ImageResults.css'


function ImageResults() {
    const [surveyData, setSurveyData] = useState(null);
    const id = useParams();
    console.log(id)
    const fetchData = () => {
        fetch(`${baseurl}/image-test/get-image-survey/${id.id}`)
          .then((res) => res.json())
          .then((data) => setSurveyData(data))
          .catch((error) => console.error('Error fetching survey data:', error));
      };

      useEffect(() => {
        fetchData()

      },[])
      console.log(surveyData)


  return (
    <div>
       <Text className='image-response'>Total Responses: { surveyData?.surveyResponses.length }</Text>
        {surveyData && <ImagesResultsContainer data={surveyData}/>}
        {surveyData?.surveyResponses.length === 0 && <NoResponseComponent/>}
        {!surveyData && <Spinner/>}
    </div>
  )
}

export default ImageResults