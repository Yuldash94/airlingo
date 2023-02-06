import React, { useEffect, useCallback } from 'react'
import {AiOutlineLock} from 'react-icons/ai'
import {FiCheckCircle, FiCircle} from 'react-icons/fi'
import './Continue.css'
import { Link, useNavigate  } from 'react-router-dom'
import {randomColor} from 'randomcolor'


export default function Continue({info, item, topics, setTopicId ,loadTopics, setUserPhoto, setUser}) {

    useEffect(()=> {
        loadTopics(localStorage.getItem('access_token'))
        setUser(localStorage.getItem('user_name'))
        setUserPhoto(localStorage.getItem('user_photo'))
    },[])

    const navigate = useNavigate()
    const handleTopicClick = useCallback(() => navigate('/messages', {replace: true}), [navigate])


  return (
    <div className='continue'>
        <div className='continue_head' style={{backgroundImage: 'url(./img/home/'+info[0].img+')'}}>
            <h3 className='topic_name'>The essentials</h3>   
        </div>        
        <div className='continue_content'>
            {topics.map((item) => 
            <div to='/messages' key={item.id} onClick={() => {
                localStorage.setItem('topic_id', item.id)
                setTopicId(localStorage.getItem('topic_id'))
                handleTopicClick()
                }}  className='content' style={{backgroundColor: item.color}}>
                <div>
                    <div className='content_name'>
                        <Link onClick={() => {
                            localStorage.setItem('topic_id', item.id)
                            setTopicId(localStorage.getItem('topic_id'))
                            }} 
                        className='to_messages' to='/messages'>{item.name}</Link>
                        {/* <p>{item.lesson_time} min</p> */}
                    </div>
                    {!item.isDeleted ? <FiCircle /> :  <FiCheckCircle/>}
                </div>
            </div>
            )}
        </div>
    </div>
  )
}
