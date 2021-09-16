import React from 'react';
import liff from '@line/liff';
import './App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/pages/HomePage';

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
      <Button variant='contained' onClick={getUserInfo}>
        show user info
      </Button>
      <Button variant='contained' onClick={getToken}>
        show token
      </Button>
      <BrowserRouter>
        <h1>Router</h1>
        <Route path='/'>
          <HomePage />
        </Route>
      </BrowserRouter>

    </div>
  )
}

export default App;