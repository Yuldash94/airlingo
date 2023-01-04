import React, { useEffect } from 'react'
import { useState } from 'react'
import  { RxCross2 } from 'react-icons/rx'
import { AiFillSound, AiFillAudio } from 'react-icons/ai'
import { FaRegKeyboard } from 'react-icons/fa'
import { TiDocumentDelete } from 'react-icons/ti'
import { TbBulb } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import './Messages.css'
import Greetings from './Greetings'
import { Metrics } from './Metrics'


//     const messagesExample = [
//     {
//       "type": "FromUser",
//       "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//       "creationTime": "2022-12-03T17:20:00.1696629Z12",
//       "audioId": null,
//       "text": "Hello"
//     },
//     {
//         "type": "FromCustomer",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z11",
//         "audioId": null,
//         "text": "Hi, welcome to Sunset Hotel. How may I help you?"
//     },
//     {
//         "type": "Information",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z0",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//         "type": "FromUser",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z9",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//         "type": "FromCustomer",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z8",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//         "type": "Information",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z7",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//     "type": "FromUser",
//     "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//     "creationTime": "2022-12-03T17:20:00.1696629Z6",
//     "audioId": null,
//     "text": "Message text is here"
//     },
//     {
//         "type": "FromCustomer",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z5",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//         "type": "Information",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z4",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//     "type": "FromUser",
//     "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//     "creationTime": "2022-12-03T17:20:00.1696629Z3",
//     "audioId": null,
//     "text": "Message text is here"
//     },
//     {
//         "type": "FromCustomer",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z2",
//         "audioId": null,
//         "text": "Message text is here"
//     },
//     {
//         "type": "Information",
//         "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
//         "creationTime": "2022-12-03T17:20:00.1696629Z1",
//         "audioId": null,
//         "text": "Message text is here"
//     },
// ]



export default function Messages( {user, token, greeting, setGreeting, topics, setTopics, loadTopics, topicId}) {
    // const teacher = {
    //     id: 1 ,
    //     first_name: 'Alec',
    //     second_name: 'Underwood',
    //     full_name: 'Alec Underwood',
    //     picture: 'alec.png'
    // }
    // console.log('token', token);
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const [metrics, setMetrics] = useState(false)
    const [metric, setMetric] = useState({})
    const url = 'https://dev.airlingo.io/api/topics/'
    const urlOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // const urlUploadOptions = {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body:  JSON.stringify({
    //         "text": `${message}`,
    //     }),
    // }
    

    // const urlMessages = `${url}${topics.topics[0].id}`
    async function loadMessages() {
        let response = await fetch(`${url}${topicId}/messages`, urlOptions)

        let json = await response.json()
        setMessages(json.messages)

        return json
    }

    async function deleteMessages() {
        await fetch(`${url}${topicId}/messages`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        loadMessages()
    }

     
    async function uploadMessages() {
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
        })
        loadMessages()
    }



    useEffect(() => {
    loadMessages()
    },[])


  return (
    <>
        {/* {greeting ? 
            <Greetings greeting={greeting} setGreeting={setGreeting}/>
            : ""} */}
            <div className='messages'>
                <TiDocumentDelete className='delete' onClick={() => deleteMessages()}/>
            <div className='close'>
                <Link to='/topics'>
                    <div className='messages_close' onClick={() => setGreeting(true)}>
                        <RxCross2 />
                    </div>
                </Link>
            </div>
            <div className='messages_head'>
                <img src={user.picture} alt='user'></img>
                <h3>{user.name}!</h3>
            </div>
            <div className='messages_list'>
                {messages.map(message => 
                    <div key={message.creationTime} 
                    className={message.type === 'FromCustomer' ? 'message message_right' : message.type==='FromUser' ? 'message message_left' : 'message message_center'}
                    onClick={() => {if (message.type === 'FromUser') {
                        setMetrics(true)
                        setMetric(message.metrics)
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
            </div>
            <Metrics active={metrics} setActive={setMetrics} metric={metric} setMetric={setMetric}/>

            <div className='messages_bottom'>
                <input id='input' placeholder='Write you message' ref={ref => {
                    setMessage(ref)
                    }}/>
                <div className='messages_btns'>
                    <div className='keyboard' onClick={(e) => {
                        uploadMessages()
                        console.log(message.value)
                        document.getElementById("input").value = ''
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
