import { createStore } from 'redux';


const initialState = {
    surveyData: [],
};

const surveyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SURVEY_DATA':
            return {
                ...state,
                surveyData: [...state.surveyData, action.payload],
            };
        default:
            return state;
    }
};

const store = createStore(surveyReducer);

export default store;


