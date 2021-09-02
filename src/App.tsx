import React from 'react';
import liff from '@line/liff';
import './App.css';

const App: React.FC = () => {
  const sendMessage = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string}).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({});
      } else if (liff.isInClient()) {
        liff.sendMessages([{
          'type': 'text',
          'text': 'send message'
        }]).then(() => {
          window.alert('message sent');
        }).catch((error) => {
          window.alert('error sending message: '+ error);
        })
      }
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
