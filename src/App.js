import { useState } from 'react';
import jwt_decode from 'jwt-decode'
import { Routes, Route } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import LibraryPage from './components/LibraryPage';
import ProfilePage from './components/ProfilePage';
import Continue from './components/Continue';


import './App.css';
import Messages from './components/Messages';

function App() {
  const [user, setUser] = useState({})
  const [pageInfo, setPageInfo] = useState([
    {
      id: 1,
      title: 'The essentials',
      img: 'info_essentials.png',
      btn_title: 'Check in',
      isActive: true,
      lesson: 'Lesson 1',
      lesson_passage: '30',
    },
    {
      id: 2,
      title: 'The city',
      img: 'info_city.png',
      btn_title: 'Indications',
      isActive: false,
      lesson: 'Lesson 2',
      lesson_passage: '45',
    },
    {
      id: 3,
      title: 'The room',
      img: 'info_room.png',
      btn_title: 'Amenities',
      isActive: false,
      lesson: 'Lesson 3',
      lesson_passage: '45',
    },
    {
      id: 4,
      title: 'The spa',
      img: 'info_spa.png',
      btn_title:'The spa',
      isActive: false,
      lesson: 'Lesson 4',
      lesson_passage: '55',
    },
    {
      id: 5,
      title: 'The essentials',
      img: 'info_essen.png',
      btn_title: 'Check out',
      isActive: false,
      lesson: 'Lesson 1',
      lesson_passage: '60',
    },
  ])
  const [chart, setChart] = useState([
    {
      id : 1,
      day: 'Mon',
      level: '80%',
    },
    {
      id : 2,
      day: 'Tue',
      level: '25%',
    },
    {
      id : 3,
      day: 'Wed',
      level: '10%',
    },
    {
      id : 4,
      day: 'Thu',
      level: '50%',
    },
    {
      id : 5,
      day: 'Fri',
      level: '10%',
    },
  ])
  const [data, setData] = useState({})
  const [token,setToken] = useState ('')
  const [greeting, setGreeting] = useState(true) 
  
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse)
      setData(tokenResponse)
      // setToken(tokenResponse.access_token)
    },
  });

  
  
  return (
    <div className="App">
      { !Object.keys(user).length && 
            <div id='App_greetings'>
            <img className='logo' src='./img/airlingo_logo.png' alt='logo'></img>
            <p className='companion'>Your AI training companion</p>
            
            <div id='signInDiv'>
              
            <GoogleLogin
              onSuccess={(credentialResponse, tokenResponse) => {
                console.log(credentialResponse);
                console.log(tokenResponse)
                setToken(credentialResponse.clientId)
                console.log('token id', token);
                console.log(jwt_decode(credentialResponse.credential))
                setUser(jwt_decode(credentialResponse.credential))
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
              theme='outline'
              size='small'
              text='signin'
              native_callback={(res) => console.log('native_callback', res)}
              nonce=''
             />
            </div>
            <p className='or '>or</p>
            <a className='create_account' href=' # ' >Create an account</a>
          </div>
      }

      { Object.keys(user).length !==0 &&
        <>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path='/home' element={<HomePage user={user} info={pageInfo} setInfo={setPageInfo} login={login} />} />
              <Route path='/library' element={<LibraryPage user={user}/>} />
              <Route path='/profile' element={<ProfilePage user={user} info={pageInfo} chart={chart} setChart={setChart}/>} />
              <Route path='/continue' element={<Continue info={pageInfo}/>}/>
              <Route path='/messages' element={<Messages token={token} user={user} info={pageInfo} setGreeting={setGreeting} greeting={greeting}/>}/>
            </Route>
          </Routes>
        </>
      }
      
    </div>
  );
}

export default App;
