import React from 'react';
import { createClientMessage } from 'react-chatbot-kit';

import { ChatActionProps } from '../items/Interfaces'

const ActionProvider = ({createChatBotMessage, setState, children} : ChatActionProps) => {
  // depth1 - 1
  const handleFirstA = () => {
    const userMessage = createClientMessage('test1', {});
    const botMessage = createChatBotMessage("This is test1.");

    setState((prev : any) => ({
      ...prev,
      messages : [...prev.messages, userMessage, botMessage],
    }));
  };

  // depth1 - 2
  const handleFirstB = () => {
    const userMessage = createClientMessage('test2', {});
    const botMessage = createChatBotMessage("This is test2.");

    setState((prev : any) => ({
      ...prev,
      messages : [...prev.messages, userMessage, botMessage],
    }));
  }

  // depth1 - 3
  const handleFirstC = () => {
    const userMessage = createClientMessage('페이지 이동', {});
    const botMessage = createChatBotMessage(
      "이동하실 페이지를 눌러주세요.",
      {
        widget : 'optionpage',
      }
    );

    setState((prev : any) => ({
      ...prev,
      messages : [...prev.messages, userMessage, botMessage],
    }));
  }

  return (
    <div className="aircok-chatbot-main">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions : {
            handleFirstA,
            handleFirstB,
            handleFirstC,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;