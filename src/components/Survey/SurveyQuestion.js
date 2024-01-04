
import React, { useState } from 'react';
import { FormControl, Input, Button, Text } from '@chakra-ui/react';
import './SurveyQuestion.css'; 

const SurveyQuestion = ({
  question,
  questionIndex,
  register,
  errors,
  handleAddOption,
  handleOptionChange,
  handleDeleteOption,
  onQuestionValueChange,
}) => {
  const [questionValue, setQuestionValue] = useState('');

  const handleInputChange = (e) => {
    setQuestionValue(e.target.value);
    onQuestionValueChange(questionIndex, e.target.value);
  };

  return (
    <FormControl key={question.id} className="FormControl">
      <Input
        placeholder={`Enter ${question.type} question`}
        {...register(`questions[${questionIndex}].question`, {
          required: 'Enter a valid question',
          validate: (value) => value.trim() !== '' || 'Enter a valid question',
        })}
        value={questionValue}
        onChange={handleInputChange}
        className="Input"
      />
      {errors.questions && (
        <Text className="Text">{`*${errors.questions[questionIndex]?.question.message}`}</Text>
      )}

      {['checkbox', 'radio'].includes(question.type) && (
        <div className="OptionsContainer">
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="OptionRow">
              <Input
                required
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(questionIndex, optionIndex, e.target.value)
                }
                marginRight="2"
              />
              <Button
                
                onClick={() => handleDeleteOption(questionIndex, optionIndex)}
                className="DeleteButton"
              >
                Delete
              </Button>
            </div>
          ))}
          <Button onClick={() => handleAddOption(questionIndex)}>
            Add Option
          </Button>
        </div>
      )}
    </FormControl>
  );
};

export default SurveyQuestion;
