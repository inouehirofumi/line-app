import React from 'react';
import liff from '@line/liff';
import './App.css';
import Button from '@material-ui/core/Button';

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
          alert(`Name: ${displayName}, userId: ${userId}, liffId: ${process.env.REACT_APP_LIFF_ID}`);
        }).catch((error) => {
          window.alert('error sending message: ' + error);
        })
      }
    })
  }
  const getToken = () => {
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID as string }).then(() => {
      if (!liff.isLoggedIn()) {
        liff.login({});
      } else if (liff.isInClient()) {
        const accessToken = liff.getAccessToken();
        alert(`accessToken: ${accessToken}`);
      }
    })
  }
  return (
    <div className='App'>
      <Button variant='contained' onClick={sendMessage}>
        Send Message
      </Button>
      <button className='button' onClick={getUserInfo}>
        show user info
      </button>
      <button className='button' onClick={getToken}>
        show token
      </button>
    </div>
  )
}

export default App;