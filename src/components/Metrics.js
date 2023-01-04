import React from 'react'
import './Metrics.css'


export const Metrics = ({active, setActive, metric, setMetric}) => {
  return (
    <div className={active ? 'metrics active' : 'metrics'} 
    onClick={() => {
        setActive(false) 
        setMetric({})}}>
        <div className='metrics_content' onClick={e => e.stopPropagation()}>
            {Object.entries(metric).map( ([key, value]) => 
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            )}
        </div>
    </div>
  )
}
