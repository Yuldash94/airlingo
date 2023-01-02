import React from 'react'
import './Metrics.css'


export const Metrics = ({active, setActive, metric, setMetric}) => {
    console.log(Object.entries(metric));
  return (
    <div className={active ? 'metrics active' : 'metrics'} 
    onClick={() => {
        setActive(false) 
        setMetric({})}}>
        <div className='metrics_content' onClick={e => e.stopPropagation()}>
            {Object.entries(metric).map( ([key, value]) => 
                <div>
                    <p>{key}: {value}</p>
                </div>
            )}
        </div>
    </div>
  )
}