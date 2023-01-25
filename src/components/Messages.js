import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import  { RxCross2 } from 'react-icons/rx'
import { AiFillSound, AiOutlineSend} from 'react-icons/ai'
import { FaRegKeyboard } from 'react-icons/fa'
import { TiDocumentDelete } from 'react-icons/ti'
import { TbBulb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import './Messages.css'
import Greetings from './Greetings'
import { Metrics } from './Metrics'
import Continue from './Continue'
import { Tips } from './Tips'
import AudioRecording from './AudioRecording'



export default function Messages( {user, token, greeting, setGreeting, topics, setTopics, loadTopics, topicId, setTopicId, userPhoto}) {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [metrics, setMetrics] = useState(false)
    const [metric, setMetric] = useState({})
    const [tips, setTips] = useState([])
    const [tip, setTip] = useState()
    const [active, setActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [audio, setAudio] = useState('')
    const guest = {
        fullName: 'Alec Underwood',
        picture: 'data:image/jpeg;base64,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',
    }
    const messageRef = useRef(null)


    const baseUrl = process.env.REACT_APP_BASE_URL
    const url = `${baseUrl}/api/topics/`
    const urlOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    }

    async function loadMessages() {
        setLoading(true)
        let response = await fetch(`${url}${topicId}/messages`, urlOptions)
        if (!response.ok) {
            localStorage.setItem('access_token', '')
          } else if (response.ok) {
            setLoading(false)
          }
        let json = await response.json()
        setMessages(json.messages)
        handleSetTip(json.messages)
        // console.log(json.messages);

        // handleMessagetToBottom()
        return json
    }                   

    async function deleteMessages(token) {
        await fetch(`${url}${topicId}/messages`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        loadMessages()
        setTips([])
    }
     
    async function uploadMessages(token) {
        if (message.value) {
            setLoading(true)
            await fetch(`${url}${topicId}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify({
                    "text": `${message.value}`,
                }),
            }).then(()=> setLoading(false))
            loadMessages()
        }

        // handleMessagetToBottom()
    }


    
    function handleMessagetToBottom() {
        const messages_end = document.getElementById('messages_end')
        messages_end.scrollIntoView({block: "start", behavior: "smooth" })
     }

     function handleMessageTips() {
        setActive(true)
        handleSetTip(messages)
    }

    function handleSetTip(messages) {
        setTips(messages)
        const messageTips = tips.filter(message => message.type === 'FromUser' ) 
        const lastTip = messageTips.pop()
        // console.log('tips', messageTips);
        // console.log('last tip', lastTip);
        if (lastTip) {
            setTip(lastTip.expectedMessage)
        }

    }
    useEffect(() => {
        loadMessages()  
    },[])
    useEffect(() => {
        handleMessagetToBottom()
    }, [messages])



  return (
    <>
        {/* {greeting ? 
            <Greetings greeting={greeting} setGreeting={setGreeting}/>
            : ""} */}
            <div className='messages'>
                <TiDocumentDelete className='delete' onClick={() => deleteMessages(localStorage.getItem('access_token'))}/>
            <div className='close'>
                <Link to='/'>
                    <div className='messages_close' onClick={() => setGreeting(true)}>
                        <RxCross2 />
                    </div>
                </Link>
            </div>
            {/* <div className='messages_head'>
                {userPhoto && 
                    <img src={userPhoto} alt=' '></img>
                }
                
                <h3>{user}</h3>
            </div> */}
            <div className='messages_head'>
                    <img src={guest.picture} alt=' '></img>
                
                <h3>{guest.fullName}</h3>
            </div>
            <div className='messages_list' id='messages_list'>
                {messages.map(message => 
                    <div key={message.creationTime} 
                    ref={messageRef}
                    className={message.type === 'FromUser' ? 'message message_right' : message.type==='FromCustomer' ? 'message message_left' : 'message message_center'}
                    onClick={() => {if (message.type === 'FromUser') {
                        setMetrics(true)
                        setMetric(message.metrics)
                    } 
                    }}
                    >
                        <p>{message.text}</p>
                        {/* {message.type === 'FromUser' || message.type === 'FromCustomer' ? 
                                        (<div className='audio'>
                                            <AiFillSound/>
                                        </div>)
                                        : ''
                        } */}
                    </div>    
                )}
                {loading && 
                    <div className='preloader'>
                         <p>Message is loading...</p>
                         <ScaleLoader color="#11273E" size={250} />
                    </div>}
                {audio ? <audio src={audio} controls></audio> : null }
                <div id='messages_end'></div>
            </div>

            {metrics ? <Metrics active={metrics} setActive={setMetrics} metric={metric} setMetric={setMetric}/> : null}
            {active ? <Tips tip={tip} setTip={setTip} active={active} setActive={setActive}/> : null}

            <div className='messages_bottom'>   
                <div className='message_input'>
                <input id='input' placeholder='Write your message' ref={ref => {
                    setMessage(ref)
                    }}/>
                <AiOutlineSend className='message_send'
                onClick={(e) => {
                    if (document.getElementById("input").value) {
                        uploadMessages(localStorage.getItem('access_token'))
                        // console.log(message.value)
                        document.getElementById("input").value = ''
                        handleMessagetToBottom()
                    }}
                    
                    }/>
                </div>
                
                <div className='messages_btns'>
                    <div className='keyboard' >
                        <FaRegKeyboard/>
                    </div>
                    <div className='recording'>
                        <AudioRecording setAudio={setAudio}/>
                    </div>
                    <div className='hint' onClick={() => {
                        handleMessageTips()
                    }}>
                        <TbBulb/>
                    </div>
                </div>
            </div>

            </div>
        
    </>
  )
}
