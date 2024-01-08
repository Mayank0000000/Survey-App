import React, { useState } from 'react';
import SurveyPreview from './SurveyPreview';
import ImagesPublishReview from './Images/ImagesPublishReview';
import VideosPublishReview from './Videos/VideosPublishReview';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    Button,
} from '@chakra-ui/react';

import axios from 'axios';
import { BASE_URL as baseurl } from '../constants';


const Sidebar = ({ survey, onClose }) => {
    let [publish, setPublish] = useState('Publish');
    let [surveyId, setSurveyId] = useState('');
    let [isButtonDisabled, setButtonDisabled] = useState(true);    

    const handlePublish = () => {
        if (survey.test) {
            return;
        }        

        const body = {
            "test": true
        };
        setTimeout(() => {
            setPublish('Published');
            setSurveyId(survey._id)
        }, 500)
        setButtonDisabled(false)

        if (survey.survey_type === 'survey') {
            axios.patch(`${baseurl}/edit/${survey._id}`, body)
                .then(response => {

                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }

        if (survey.survey_type === 'image') {           

            axios.patch(`${baseurl}/api/edit-image/${survey._id}`, body)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });

        }

        if (survey.survey_type === 'video') {
            axios.patch(`${baseurl}/videos/edit-video/${survey._id}`, body)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };


    if (survey.test) {
        publish = 'Published';
        surveyId = survey._id;
        isButtonDisabled = false
    };


    return (
        <Drawer isOpen={!!survey} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg="gray.800" p="4" color="white">

                {survey.survey_type === 'survey' && <SurveyPreview survey={survey} onClose={onClose} publish={publish} surveyId={surveyId} isDisabled={isButtonDisabled} />}
                {survey.survey_type === 'image' && <ImagesPublishReview survey={survey} onClose={onClose} publish={publish} surveyId={surveyId} isDisabled={isButtonDisabled} />}
                {survey.survey_type === 'video' && <VideosPublishReview survey={survey} onClose={onClose} publish={publish} surveyId={surveyId} isDisabled={isButtonDisabled} />}


                <Button onClick={handlePublish} mt='1rem'>
                    {publish}
                </Button>

            </DrawerContent>
        </Drawer>
    );
};

export default Sidebar;
