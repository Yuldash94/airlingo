import React from 'react'
import { useEffect } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { SlArrowRight } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import './ProfilePage.css'

export default function ProfilePage({user, info, chart, setChart, topics, setTopics, loadTopics, token}) {
  const url = 'https://dev.airlingo.io/api/topics/'
  const urlOptions = {
    method: 'GET',
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  useEffect(() => {
    loadTopics(url, urlOptions)
  }, [])

  return (
    <div className='profile'>
        <div className='profile_header'>
        <img src={user.picture} alt='user'></img>
          <div className='profile_header_name'>
            <h3>Hello {user.given_name}!</h3>
            <div className='profile_level'>
              <p>Level 2</p>
              <RxDotFilled/>
              <p>Intermediate</p>
            </div>
          </div>
        </div>
        <div className='profile_average'> 
          <span>
            <h3>Weekly average </h3>
            <h3>2h 30 min</h3>
          </span>
          <div className='chart'>
            {chart.map((item) => (
                  <div key={item.id} className='chart_column'>
                    <div className='column' style={{height:item.level}}></div>
                    <p>{item.day}</p>
                  </div>
            ))}
          </div>
        </div>
        <div className='profile_lessons'>
          <div className='profile_window'>
            <div className='profile_all'>
              {info.map((item) => (
                  <div key={item.id} className='lesson'>
                        <div className='lesson_level'>
                          <h3>{item.lesson}</h3>
                          <div className='pie pie_white'>
                            <div className='pie' style={{"--p":item.lesson_passage}}>{item.lesson_passage}%</div>
                          </div>
                        </div>
                        <div className='lesson_img' style={{backgroundImage: 'url(./img/home/'+item.img+')'}}>
                          <p>{item.title}</p>
                        </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
        <div className='profile_library'>
                <h2>Your library</h2>
                {info.map((item) => (
                  <div key={item.id} className='your_library'>
                    <img src={'./img/home/'+item.img} alt=' '></img>
                    <div>
                      <p>{item.title}</p>
                      <Link to='/continue' item={item}>
                        <SlArrowRight values={{color: '#11273E', size: '24px'}}/>
                      </Link>
                    </div>
                  </div>
                ))}
        </div>
    </div>
  )
}
