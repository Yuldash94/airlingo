import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode'
import { Routes, Route } from 'react-router-dom';
import { GoogleLogin,useGoogleLogin } from '@react-oauth/google'
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
  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token:' + response.credential);
  //   let userObject = jwt_decode(response.credential)
  //   console.log(userObject);
  //   console.log(response);
  //   setUser(userObject)
  //   document.getElementById('signInDiv').hidden = true
  // }

  // function handleSignOut(event) {
  //   setUser({})
  //   window.google.accounts.id.disableAutoSelect()
  //   document.getElementById('signInDiv').hidden = false
  // }

  // useEffect(() =>{
  //   // global google
  //   window.google.accounts.id.initialize({
  //     client_id: '268425863623-r7oavatem0cs8df8n7j9mq4lc9iq2l21.apps.googleusercontent.com',
  //     callback: handleCallbackResponse
  //   })

  //   window.google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {
  //       theme: 'filled-black',
  //       size: 'medium',
  //       text: 'signin'
  //     }
  //   )
  // },[])

  // const login = useGoogleLogin({
  //   onSuccess: ( codeResponse) => {console.log('TOKEN',codeResponse)
  //   console.log('codeResponse',codeResponse)
  //   // const token = tokenResponse.access_token
  //   setToken(token)   
  // },
  // flow: 'implicit | auth-code',
  // scope: '',
  // enable_serial_consent: true,
  // prompt: 'consent',
  // hint: '',
  // });
  const [token,setToken] = useState ('')
  const [greeting, setGreeting] = useState(true) 
  return (
    <div className="App">
      { !Object.keys(user).length && 
            <div id='App_greetings'>
            <img className='logo' src='./img/airlingo_logo.png' alt='logo'></img>
            <p className='companion'>Your AI training companion</p>
            
            <div id='signInDiv'>
              {/* <div onClick={() => login()}>Login</div> */}
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
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
              login_uri='https://dev.airlingo.io/api/topic/'
              native_login_uri='https://dev.airlingo.io/api/topic/'
              native_callback={(res) => console.log('native_callback', res)}
              nonce=''
            />
            </div>
            {/* { Object.keys(user).length !== 0 && 
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            }
            { Object.keys(user).length !== 0 && 
              <div>
                <img src={user.picture} alt="user_image"></img>
                <h3>{user.name}</h3>
              </div> 
            } */}
            <p className='or '>or</p>
            <a className='create_account' href=' # ' >Create an account</a>
          </div>
      }

      { Object.keys(user).length !==0 &&
        <>
          <Routes>
            <Route path='/' element={<Layout/>}>
              <Route path='/home' element={<HomePage user={user} info={pageInfo} setInfo={setPageInfo}/>} />
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
