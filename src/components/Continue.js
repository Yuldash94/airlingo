import React from 'react'
import {AiOutlineLock} from 'react-icons/ai'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import './Continue.css'
import { Link } from 'react-router-dom'


export default function Continue({info, item, topics, setTopicId}) {

    const lessons = [
        {
        lesson_id: 1,
        lesson_name: 'Greetings',
        lesson_time: '3',
        active: true,
        passed: true
        },
        {
        lesson_id: 2,
        lesson_name: 'Check in',
        lesson_time: '3',
        active: true,
        passed: false
        },
        {
        lesson_id: 3,
        lesson_name: 'Reservation',
        lesson_time: '3',
        active: false,
        passed: false
        },
        {
        lesson_id: 4,
        lesson_name: 'Check out',
        lesson_time: '3',
        active: false,
        passed: false
        },
        {
        lesson_id: 5,
        lesson_name: 'Information',
        lesson_time: '3',
        active: false,
        passed: false
        },
        {
        lesson_id: 6,
        lesson_name: 'Room problems',
        lesson_time: '3',
        active: false,
        passed: false
        },
    ]

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
