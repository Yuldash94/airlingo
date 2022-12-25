import React from 'react'
import './HomePage.css'
import {SlArrowRight} from 'react-icons/sl'
import {TfiLock} from 'react-icons/tfi'
import { Link } from 'react-router-dom';


export default function HomePage({user, info}) {
  

  return (
    <div className='home_page'>
        <div className='home_page_header'>
            <img src={user.picture} alt='user'></img>
            <h3>Good morning {user.given_name}!</h3>
        </div>
        <div className='fire'>
          <img src='./img/fire.png' alt=''></img>
          <h1>3</h1>
          <p>days of practice</p>
        </div>
        <div className='home_page_info'>
          <div className='carousel_container'>
              <div className='window'>
                  <div className='all_container'>
                          { info.map(item => (
                            <div key={item.id} className='page_info' style={{backgroundImage: 'url(./img/home/'+item.img+')'}}>
                              <div className='page_info_top'>
                                <h3>{item.title}</h3>
                                <div className='loading'>
                                  <div className='load'></div>
                                </div>
                              </div>
                              <div className='page_info_bottom'>
                                  <div className='continue_btn'>
                                    <p>Continue with: <br/><b>{item.btn_title}</b></p>
                                  </div>
                                  <Link to='/continue' title={item.btn_title}>
                                    <SlArrowRight values={{color: '#11273E', size: '24px'}}/>
                                  </Link>
                              </div>
                            </div>
                          ))}
                  </div>
              </div>
          </div>
        </div>
        <div className='challenge'>
           <h3>Daily Challenge   <TfiLock /> </h3>            
        </div>
    </div>
  )
}
