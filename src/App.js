import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode'
import { Routes, Route, Link} from 'react-router-dom';
import { GoogleLogin, useGoogleLogin} from '@react-oauth/google'
import Layout from './components/Layout';
// import HomePage from './components/HomePage';
// import LibraryPage from './components/LibraryPage';
// import ProfilePage from './components/ProfilePage';
import Continue from './components/Continue';
import './App.css';
import Messages from './components/Messages';

function App() {
  const [user, setUser] = useState({})
  const [userPhoto, setUserPhoto] = useState({})
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
  const [topicId, setTopicId] = useState({})
  const [token, setToken] = useState ('')
  const [greeting, setGreeting] = useState(true) 
  
  useEffect(()=> {
    if (!localStorage.getItem('access_token')){
      localStorage.setItem('access_token', '')
    }
  }, [])

  const onSuccess = (credentialResponse) => {
      // console.log('cre response', credentialResponse)
      localStorage.setItem('access_token', credentialResponse.access_token)
      setToken(localStorage.getItem('access_token'))
      // console.log('token id onSucces', credentialResponse.access_token);
      loadTopics(localStorage.getItem('access_token'))
      loadUserInfo(localStorage.getItem('access_token'))
      loadUserPhoto(localStorage.getItem('access_token'))
  }

  const login = useGoogleLogin({
    onSuccess:  onSuccess,
    onError: (err) => { console.log('login fail', err);},
    flow: 'implicit',
  });
  
  async function loadUserInfo(token) {
    let response = await fetch('https://people.googleapis.com/v1/people/me?personFields=names', {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    let user = await response.json()
    // console.log('userInfo', user.names[0])
    localStorage.setItem('user_name', user.names[0].displayName)
    setUser(user.names[0].displayName)
    return user
  }
 
  async function loadUserPhoto(token) {
    let response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    let userPhoto = await response.json()
    // console.log('userPhoto', userPhoto.photos[0])
    localStorage.setItem('user_photo', userPhoto.photos[0].url)
    setUserPhoto(userPhoto.photos[0].url)
    return userPhoto
  }

  const [topics, setTopics] = useState([])
  const baseUrl = process.env.REACT_APP_BASE_URL
  const url = `${baseUrl}/api/topics/`

  async function loadTopics(token) {
    let response = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
    })
    if (!response.ok) {
      localStorage.setItem('access_token', '')
    }
    let json = await response.json()
    console.log('topics json',json)
    setTopics(json.topics)
    return json;
  }

    
  if (!localStorage.getItem('access_token') && localStorage.getItem('access_token') === '') {

  return (
    <div className="App">
      
      {/* {  !localStorage.getItem('access_token') && localStorage.getItem('access_token') === ''  ?  */}
            <div id='App_greetings'>
            <img className='logo' src='./img/airlingo_logo.png' alt='logo'></img>
            <p className='companion'>Your AI training companion</p>
            <div id='signInDiv'>
              <Link to='/' className='login_btn' onClick={() => {
                login()
                }}>
                  Login
              </Link>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                // console.log(tokenResponse)
                // setToken(credentialResponse.access_token)
                console.log(jwt_decode(credentialResponse.credential))
                setUser(jwt_decode(credentialResponse.credential))
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              // useOneTap
              theme='outline'
              size='small'
              text='signin'
              native_callback={(credentialResponse) => credentialResponse.requestAccessToken()}
              nonce=''
              flow='implict'
             /> */}

            </div>
            <p className='or '>or</p>
            <a className='create_account' href='  ' >Create an account</a>
          </div> 
    </div> 
  )}
          // :
  else if (localStorage.getItem('access_token') && localStorage.getItem('access_token') !== '' && Object.keys(topics) !== 0  && topics) {

      return (
        <div className="App">  

          {/* localStorage.getItem('access_token') && localStorage.getItem('access_token') !== '' && Object.keys(topics) !== 0  && topics ? */}
            <>
              <Routes>
                <Route path='/' element={<Layout />}>
                  {/* <Route path='/home' element={<HomePage user={user} info={pageInfo} setInfo={setPageInfo} login={login} />} />
                  <Route path='/library' element={<LibraryPage user={user}/>} />
                  <Route  path='/profile' element={<ProfilePage user={user} info={pageInfo} chart={chart} setChart={setChart} topics={topics} setTopics={setTopics} loadTopics={loadTopics} token={token}/>} /> */}
                  <Route path='/' element={<Continue info={pageInfo} topics={topics} setTopicId={setTopicId} loadTopics={loadTopics}  setUserPhoto={setUserPhoto} setUser={setUser} />}/>
                  <Route path='/messages' element={<Messages token={token} user={user} userPhoto={userPhoto} info={pageInfo} setGreeting={setGreeting} greeting={greeting} topics={topics} setTopics={setTopics} loadTopics={loadTopics} topicId={topicId} setTopicId={setTopicId}/>}/>
                </Route>
              </Routes>
            </>
            {/* : null
          }
       */}
    </div>
  )}
}

export default App;
