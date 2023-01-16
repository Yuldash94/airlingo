import React from 'react'
import './Metrics.css'


export const Metrics = ({active, setActive, metric, setMetric}) => {
  return (
    <div className={active ? 'metrics active' : 'metrics'} 
    onClick={() => {
        setActive(false) 
        setMetric({})}}>
        <div className='metrics_content' onClick={e => e.stopPropagation()}>
            <p>RECOMMENDATION</p>
            {metric['general-recommendations'].split('.').map((item) => 
              <p key={item}>{item}</p>
            )}
            {/* <p>{metric['general-recommendations']}</p> */}
            <p>sentiment: {metric.sentiment}</p>
            {/* {Object.entries(metric).map( ([key, value]) => 
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            )} */}
        </div>
    </div>
  )
}
