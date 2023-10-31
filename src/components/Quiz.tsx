import React, { useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const [selection, setSelection] = useState<string | null>(null);
  const [quizCore, _] =  useState<QuizCore>(new QuizCore);
  const [forceUpdate, setForceUpdate] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelection(option);
  }


  const handleButtonClick = (): void => {
    quizCore.nextQuestion();
    setForceUpdate(!forceUpdate);
  } 

  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selection === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selection ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;