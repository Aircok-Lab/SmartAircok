import React from 'react';

import ChatOptions from '../ChatOptions';

const OptionFirst = (props : any) => {
  const chatbot_options = [
    {
      text : "test1",
      handler: props.actionProvider.handleFirstA,
      id : 1,
    },
    { 
      text : "test2",
      handler: props.actionProvider.handleFirstB,
      id : 2 
    },
    { 
      text : "페이지 이동",
      handler: props.actionProvider.handleFirstC,
      id : 3 
    },
  ];

  return (<ChatOptions chatbot_options={chatbot_options}/>);
}

export default OptionFirst;