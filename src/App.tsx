import React from 'react';
import './App.css';
import { buildReplyText } from 'line-message-builder';

const App: React.FC = () => {
  const sendMessage = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string}).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({});
      }
      liff.sendMessages(buildReplyText(['Send Message']));
    });
  }
  return (
    <div className='App'>
      <button className='button' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  )
}

export default App;
