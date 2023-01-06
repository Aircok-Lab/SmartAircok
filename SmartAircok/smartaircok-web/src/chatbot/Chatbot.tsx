import React, { useState } from 'react'

import ChatbotKit from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import ChatConfig from '../chatbot/ChatConfig';
import ActionProvider from '../chatbot/ActionProvider';
import MessageParser from '../chatbot/MessageParser';

import chatbotico from '../img/chatbot.svg';

import './Chatbot.css'

const Chatbot = () => {
  const [chatbotchk, setchatbotchk] = useState<boolean>(false)
  
  return (
    <>
      <img src={chatbotico}className="aircok-chatbot-btn" alt="aircok-chatbot-btn" onClick={() => setchatbotchk(!chatbotchk)}/>

      {chatbotchk ? 
        <ChatbotKit
          config={ChatConfig}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
        : 
        <></>
      }
    </>
  );
}

export default Chatbot;