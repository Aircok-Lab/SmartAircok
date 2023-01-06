import React from 'react'
import { createChatBotMessage } from 'react-chatbot-kit';

import OptionFirst from './options/OptionFirst';
import OptionPage from './options/OptionPage';

import chatbotico from '../img/chatbot.svg';

const Config = {
  botName : 'AircokBot',
  initialMessages : [
    createChatBotMessage("반갑습니다!!", {}),
    createChatBotMessage(
      "무엇을 도와드릴까요?",
      {
        widget : "optionfirst",
        delay : 500,
      }),  
  ],
  customComponents : {
    header : () => <div className="chat-header"> Aircok Chat Bot </div>,
    botAvatar : () => 
      <div className="chat-botAvatar"> 
        <img src={chatbotico} className="chat-botAvatar-icon" alt="chat-botAvatar-icon"/>
        aircok 
      </div>,
    // botChatMessage: () => <div/>,
    userAvatar : () => <></>,
    // userChatMessage: () => <div/>,
  },
  customStyles : {
    botMessageBox : {
      // backgroundColor: '#376B7E',
      backgroundColor : '#5e5e5e',
    },
    chatButton: {
      backgroundColor : '#5ccc9d',
    },
  },
  widgets : [
    {
      widgetName : 'optionfirst',
      widgetFunc : (props : any) => {
        return <OptionFirst {...props} />
      },
      props : {},
      mapStateToProps : [],
    },
    {
      widgetName : 'optionpage',
      widgetFunc : (props : any) => {
        return <OptionPage {...props} />
      },
      props : {},
      mapStateToProps : [],
    },
  ],
};

export default Config;