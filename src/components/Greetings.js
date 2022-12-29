import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { BiEqualizer } from 'react-icons/bi'
import './Greetings.css'

export default function Greetings( {greeting, setGreeting}) {
  const [skip, setSkip] = useState(0)
  function showNextGreet() {
    setSkip(skip + 1)
    if (skip === 5) {
      setGreeting(false)
      setSkip(0)
    }
  }


  return (
    <div className='greetings'>
        <div className='greetings_head'>
            <div>
              <div className='greetings_load'>
                  <div className='greetings_load_full' >
                  </div>
              </div>
              <div className='greetings_close'>
                  <RxCross2 onClick={() => {setGreeting(false)}}/>
              </div>
            </div>
        </div>
        <div className='greetings_inner'>
          <p>A guest enters the hotel...</p>
          {skip >= 1 ? <p>And go to the front desk</p> : ''}
          {skip === 1 ? 
              <div style={{alignSelf: 'flex-end'}}> 
                <p>Recepcionist</p>
                <div className='equalizer equalizer_reciption'>
                    <BiEqualizer/>
                </div>
              </div>
          :''} 
          {skip >= 2 ?
            <div className='message message_right'>
              <p>Hi, welcome to Sunset Hotel. How may I help you?</p>
            </div>
          :''}
          {skip === 3 ?
            <div style={{alignSelf: 'flex-start'}}> 
              <p>Guest</p>
              <div className='equalizer equalizer_guest'>
                  <BiEqualizer/>
              </div>
            </div>
          :''}
          {skip >= 4 ?
            <div className='message message_left'>
              <p>Hello. I'm checking in. My name is Underwood</p>
            </div>
          :''}
        </div>
        <div className='skip' onClick={() => {showNextGreet()}}>
            Skip
        </div>
    </div>
  )
}
