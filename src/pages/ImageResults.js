import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ImagesResultsContainer from '../components/Images/ImagesResultsContainer';
import NoResponseComponent from '../components/NoResponseComponent';

function ImageResults() {
    const [surveyData, setSurveyData] = useState(null);
    const id = useParams();
    console.log(id)
    const fetchData = () => {
        fetch(`http://localhost:3001/image-test/get-image-survey/${id.id}`)
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
        {surveyData && <ImagesResultsContainer data={surveyData}/>}
        {surveyData?.surveyResponses.length === 0 && <NoResponseComponent/>}
    </div>
  )
}

export default ImageResults