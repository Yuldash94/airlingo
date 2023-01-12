import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import  { RxCross2 } from 'react-icons/rx'
import { AiFillSound, AiFillAudio } from 'react-icons/ai'
import { FaRegKeyboard } from 'react-icons/fa'
import { TiDocumentDelete } from 'react-icons/ti'
import { TbBulb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import './Messages.css'
import Greetings from './Greetings'
import { Metrics } from './Metrics'
import Continue from './Continue'



export default function Messages( {user, token, greeting, setGreeting, topics, setTopics, loadTopics, topicId, setTopicId, userPhoto}) {

    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [metrics, setMetrics] = useState(false)
    const [metric, setMetric] = useState({})
    const [loading, setLoading] = useState(false)

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

    }
     
    async function uploadMessages(token) {
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
        // handleMessagetToBottom()
    }

    useEffect(() => {
        loadMessages()
        
    },[])
    
    function handleMessagetToBottom() {
        const messages_end = document.getElementById('messages_end')
        messages_end.scrollIntoView({block: "start", behavior: "smooth" })
     }

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
            <div className='messages_head'>
                {userPhoto && 
                    <img src={userPhoto} alt=' '></img>
                }
                
                <h3>{user}</h3>
            </div>
            <div className='messages_list' id='messages_list'>
                {messages.map(message => 
                    <div key={message.creationTime} 
                    ref={messageRef}
                    className={message.type === 'FromCustomer' ? 'message message_right' : message.type==='FromUser' ? 'message message_left' : 'message message_center'}
                    onClick={() => {if (message.type === 'FromUser') {
                        setMetrics(true)
                        setMetric(message.metrics)
                        console.log('ref', messageRef.current);
                    } 
                    }}
                    >
                        <p>{message.text}</p>
                        {message.type === 'FromUser' || message.type === 'FromCustomer' ? 
                                        (<div className='audio'>
                                            <AiFillSound/>
                                        </div>)
                                        : ''
                        }
                    </div>    
                )}
                {!loading && 
                    <div className='preloader'>
                         <p>Message is loading...</p>
                         <ScaleLoader color="#11273E" size={250} />
                    </div>}
                <div id='messages_end'></div>
            </div>

            <Metrics active={metrics} setActive={setMetrics} metric={metric} setMetric={setMetric}/>

            <div className='messages_bottom'>
                <input id='input' placeholder='Write you message' ref={ref => {
                    setMessage(ref)
                    }}/>
                <div className='messages_btns'>
                    <div className='keyboard' onClick={(e) => {
                        uploadMessages(localStorage.getItem('access_token'))
                        // console.log(message.value)
                        document.getElementById("input").value = ''
                        handleMessagetToBottom()
                        }
                        
                        }>
                        <FaRegKeyboard/>
                    </div>
                    <div className='recording'>
                        <AiFillAudio/>
                    </div>
                    <div className='hint'>
                        <TbBulb/>
                    </div>
                </div>
            </div>

            </div>
        
    </>
  )
}
