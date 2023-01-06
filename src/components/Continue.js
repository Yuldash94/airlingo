import React, { useEffect } from 'react'
import {AiOutlineLock} from 'react-icons/ai'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import './Continue.css'
import { Link } from 'react-router-dom'


export default function Continue({info, item, topics, setTopicId ,loadTopics, setUserPhoto, setUser}) {

    useEffect(()=> {
        loadTopics(localStorage.getItem('access_token'))
        setUser(localStorage.getItem('user_name'))
        setUserPhoto(localStorage.getItem('user_photo'))
    },[])



  return (
    <div className='continue'>
        <div className='continue_head' style={{backgroundImage: 'url(./img/home/'+info[0].img+')'}}>
            <h3 className='topic_name'>Topics</h3>   
        </div>        
        <div className='continue_content'>
            {topics.map((item) => 
            <Link to='/messages' key={item.id} onClick={() => {
                localStorage.setItem('topic_id', item.id)
                setTopicId(localStorage.getItem('topic_id'))
                }}  className='content'>
                <div>
                    <div className='content_name'>
                        <Link onClick={() => {
                            localStorage.setItem('topic_id', item.id)
                            setTopicId(localStorage.getItem('topic_id'))
                            }} 
                        className='to_messages' to='/messages'>{item.name}</Link>
                        {/* <p>{item.lesson_time} min</p> */}
                    </div>
                    {item.isDeleted ? <AiOutlineLock values={{size: '36px'}}/> :  <IoMdCheckmarkCircleOutline/>}
                </div>
            </Link>
            )}
        </div>
    </div>
  )
}
