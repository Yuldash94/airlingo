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
            
            <div>
            {Object.entries(metric).map( ([key, value]) => 
                <div>
                    <p>{key}: {value}</p>
                </div>
            
            )}
                {/* <p>{Object.keys(metric)}</p>
                <p>{Object.values(metric)}</p> */}
            </div>
        </div>
    </div>
  )
}
