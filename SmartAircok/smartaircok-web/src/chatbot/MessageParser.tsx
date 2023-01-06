import React from 'react';

import {ChatMessageProps} from '../items/Interfaces'

const MessageParser = ({children, actions} : ChatMessageProps) => {
  const parse = (message : string) => {
    if (message.includes('hello')) {
      actions.handleHello();
    }

    if (message.includes('test')) {
      actions.handleTest();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse : parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;