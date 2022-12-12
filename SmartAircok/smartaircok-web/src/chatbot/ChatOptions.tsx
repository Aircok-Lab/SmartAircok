import React from 'react'

import {ChatAnswersProps, ChatAnswerProps} from '../items/interfaces'

import './ChatOptions.css'

const ChatOptions = ({chatbot_options} : ChatAnswersProps) => {
  const buttonsMarkup = chatbot_options.map((option : ChatAnswerProps) => (
    <button className="chatbot-option-button" key={option.id} onClick={option.handler}>
      {option.text}
    </button>
  ));

  return (
    <div className="chatbot-options-container">
      {buttonsMarkup}
    </div>
  );
}

export default ChatOptions; 