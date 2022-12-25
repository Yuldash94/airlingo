import React from 'react'
import { useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { BiSearchAlt } from 'react-icons/bi'
import { GoTriangleDown, GoTriangleRight } from 'react-icons/go'
import { AiFillSound } from 'react-icons/ai'
import './LibraryPage.css'


export default function LibraryPage({user}) {
  const [check, setCheck] = useState(false)
  const checkList = [
    {
      id: 1,
      message: `Hi, welcome to Sunset Hotel. How may I help you?`,
    },
    {
      id: 2,
      message: `Of course, Mr. Underwood. Let me just grab your reservation.`,
    },
    {
      id: 3,
      message: `I see that you're in one of our suites. Is that correct?`,
    },
    {
      id: 4,
      message: `Excellent. I'll just need your ID and credit card.`,
    },
  ]
  function checkChange() {
    if (check === true) {
      setCheck(false)
    } else {
      setCheck(true)
    }
  }

  return (
    <div className='library_page'>
      <div className='library_header'>
        <img src={user.picture} alt='user'></img>
          <div className='library_header_name'>
            <h3>Hello {user.given_name}!</h3>
            <div className='profile_level'>
              <p>Level 2</p>
              <RxDotFilled/>
              <p>Intermediate</p>
            </div>
          </div>
      </div>
      <div className='library_search'>
        <input id='check_input' type='text'></input>
        <BiSearchAlt />
      </div>
      <div className='library_checkin'>
        {!check ? <GoTriangleRight onClick={checkChange}/> : <GoTriangleDown onClick={checkChange}/>}
        <p>Check in</p>
      </div>
      { check && 
        <div className='checkin_list'> 
          {checkList.map( item =>
            <div key={item.id} className='checkin_item'>  
              <p>{item.message}</p>
              <AiFillSound style={{fontSize: '24px'}}/>
            </div>
          )}
        </div>
      }
    </div>
  )
}
