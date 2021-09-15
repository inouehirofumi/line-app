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
  const getUserInfo = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({});
      } else if (liff.isInClient()) {
        liff.getProfile().then(profile => {
          const userId: string = profile.userId;
          const displayName: string = profile.displayName;
          alert(`Name: ${displayName}, userId: ${userId}`);
        }).catch((error) => {
          window.alert('error sending message: ' + error);
        })
      }
    })
  }
  return (
    <div className='App'>
      <button className='button' onClick={sendMessage}>
        Send Message
      </button>
      <button className='button' onClick={getUserInfo}>
        show user info
      </button>
    </div>
  )
}

export default App;