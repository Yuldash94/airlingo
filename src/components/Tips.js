import React from 'react'
import './Tips.css'
import { TbBulb } from 'react-icons/tb'


export const Tips = ({active, setActive, tip, setTip}) => {
  return (
    <div className={active ? 'tips active' : 'tips'} 
        onClick={() => {
            setActive(false) 
            setTip()
        }}>
        <div className='tips_content' onClick={e => e.stopPropagation()}>
            <TbBulb/>
            {tip ? <p>Expected message in previous post: {tip.text}</p> : <p>Greet the guests</p>}
        </div>
    </div>
  )
}
