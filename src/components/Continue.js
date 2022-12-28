import React from 'react'
import {AiOutlineLock} from 'react-icons/ai'
import {IoMdCheckmarkCircleOutline} from 'react-icons/io'
import {BsCircle} from 'react-icons/bs'
import './Continue.css'


export default function Continue({info, item}) {

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
            <h3>{info[0].title}</h3>   
        </div>
        <div className='continue_content'>
            {lessons.map((item) => 
            <div key={item.lesson_id} className='content'>
                <div>
                    <div className='content_name'>
                        <h3>{item.lesson_name}</h3>
                        <p>{item.lesson_time} min</p>
                    </div>
                    {!item.active && !item.passed ? <AiOutlineLock values={{size: '36px'}}/> : item.passed ? <IoMdCheckmarkCircleOutline/> : <BsCircle/>}
                </div>
            </div>
            )}
        </div>
    </div>
  )
}
