import React, { useEffect } from 'react'
import { useState } from 'react'
import  { TiDeleteOutline } from 'react-icons/ti'
import { AiFillSound } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import './Messages.css'
import jwtDecode from 'jwt-decode'

export default function Messages( {user, token}) {
    const teacher = {
        id: 1 ,
        first_name: 'Alec',
        second_name: 'Underwood',
        full_name: 'Alec Underwood',
        picture: 'alec.png'
    }

    const [messages, setMessages] = useState([
        {
          "type": "FromUser",
          "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
          "creationTime": "2022-12-03T17:20:00.1696629Z12",
          "audioId": null,
          "text": "Hello"
        },
        {
            "type": "FromCustomer",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z11",
            "audioId": null,
            "text": "Hi, welcome to Sunset Hotel. How may I help you?"
        },
        {
            "type": "Information",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z0",
            "audioId": null,
            "text": "Message text is here"
        },
        {
            "type": "FromUser",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z9",
            "audioId": null,
            "text": "Message text is here"
        },
        {
            "type": "FromCustomer",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z8",
            "audioId": null,
            "text": "Message text is here"
        },
        {
            "type": "Information",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z7",
            "audioId": null,
            "text": "Message text is here"
        },
        {
        "type": "FromUser",
        "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
        "creationTime": "2022-12-03T17:20:00.1696629Z6",
        "audioId": null,
        "text": "Message text is here"
        },
        {
            "type": "FromCustomer",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z5",
            "audioId": null,
            "text": "Message text is here"
        },
        {
            "type": "Information",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z4",
            "audioId": null,
            "text": "Message text is here"
        },
        {
        "type": "FromUser",
        "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
        "creationTime": "2022-12-03T17:20:00.1696629Z3",
        "audioId": null,
        "text": "Message text is here"
        },
        {
            "type": "FromCustomer",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z2",
            "audioId": null,
            "text": "Message text is here"
        },
        {
            "type": "Information",
            "id": "6a4c1256-1c8c-4fbe-bd9f-4330198a468f",
            "creationTime": "2022-12-03T17:20:00.1696629Z1",
            "audioId": null,
            "text": "Message text is here"
        },
    ])
    
    // const url = 'https://dev.airlingo.io/api/topics/'
    // useEffect(() => {
    //     fetch(`${url}${user.jti}/messages`)
    //     .then(res => console.log('res', res.json()))
    //     .then (rej => console.log('rej', rej))
    // })
    
  return (
    <div className='messages'>
        <div className='close'>
            <Link to='/home'>
                <TiDeleteOutline />
            </Link>
        </div>
        <div className='messages_head'>
            <img src={user.picture} alt='user'></img>
            <h3>{user.name}!</h3>
        </div>
        <div className='messages_list'>
            {messages.map(message => 
                <div key={message.creationTime} className={message.type === 'FromCustomer' ? 'message message_right' : message.type==='FromUser' ? 'message message_left' : 'message message_center'}>
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
    </div>
  )
}
