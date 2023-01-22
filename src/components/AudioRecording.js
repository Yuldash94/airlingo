import React, { useEffect, useState } from 'react'
import { AiFillAudio } from 'react-icons/ai'
import { useReactMediaRecorder } from "react-media-recorder";


export default function AudioRecording( { setAudio } ) {
    
    const [recording, setRecording] = useState(false)

    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });
    const handleRecordAudio = () => {
        setAudio('')
        setRecording(true)
        startRecording()
    }

    const handleStopRecordAudio = () => {
        setRecording(false)
        stopRecording()
    }

    if (status === 'stopped' && mediaBlobUrl) {
        setAudio(mediaBlobUrl)
    }

  return (
    <>
            {!recording ? <AiFillAudio onClick={() => handleRecordAudio()}/> : <AiFillAudio color='red' onClick={() => handleStopRecordAudio()}/>}
    </>
  )
}
