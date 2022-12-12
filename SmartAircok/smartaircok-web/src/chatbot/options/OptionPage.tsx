import React from 'react';

import ChatOptions from '../ChatOptions';

const OptionPage = (props : any) => {
  const chatbot_options = [
    {
      text : "데이터",
      handler: props.actionProvider.handleFirstA,
      id : 1,
    },
    { 
      text : "권한 관리",
      handler: props.actionProvider.handleFirstA,
      id : 2 
    },
    { 
      text : "조직 관리",
      handler: props.actionProvider.handleFirstA,
      id : 3 
    },
    { 
      text : "API 관리",
      handler: props.actionProvider.handleFirstA,
      id : 4 
    },
  ];

  return (<ChatOptions chatbot_options={chatbot_options}/>);
}

export default OptionPage;