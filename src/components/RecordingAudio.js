import React, {useState} from 'react'
import { AiFillAudio } from 'react-icons/ai'
import useMediaRecorder from '@wmik/use-media-recorder';

function RecordingAudio({setAudio}) {

    const [recording, setRecording] = useState(false)

    let {
        error,
        status,
        mediaBlob,
        stopRecording,
        startRecording
      } = useMediaRecorder({
        blobOptions: { type: 'audio/wav' },
        mediaStreamConstraints: { audio: true }
      });
      

      const handleRecordAudio = () => {
        setAudio(null)
        setRecording(true)
        startRecording()
    }

    const handleStopRecordAudio = () => {
        setRecording(false)
        stopRecording()
    }
    if (status === 'stopped' && mediaBlob) {
        setAudio(mediaBlob)
        // console.log(mediaBlob);
    }
    if (error) {
        alert('An unexpected error has occurred, please try again...', error)
    }
  return (
    <>
        {!recording ? <AiFillAudio onClick={() => handleRecordAudio()}/> : <AiFillAudio className='recording_blink' color='red' onClick={() => handleStopRecordAudio()}/>}
    </>
  )
}

export default RecordingAudio