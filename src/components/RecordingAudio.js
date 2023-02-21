import React, {useEffect, useState} from 'react'
import { AiFillAudio, AiTwotoneAudio } from 'react-icons/ai'
import useMediaRecorder from '@wmik/use-media-recorder';

function RecordingAudio({setAudio, audio, baseUrl, uploadAudio}) {

    const [recording, setRecording] = useState(false)

    let {
        error,
        status,
        mediaBlob,
        stopRecording,
        startRecording
      } = useMediaRecorder({
        blobOptions: { type: 'audio/x-wav' },
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
      let audioFile = new FormData() 
      if (audio !== mediaBlob && mediaBlob) {
          // console.log('mediaBlob:', mediaBlob);
          // console.log('data1', audioFile);
          audioFile.set("formFile", mediaBlob)
          uploadAudio(audioFile)
          // console.log('data2', audioFile.get('formFile'))

        }
    }
    if (error) {
        alert('An unexpected error has occurred, please try again...', error)
    }

    useEffect(() => {

    },[])
  return (
    <>
        {!recording ? 
          <AiFillAudio 
          onClick={() => handleRecordAudio()}/> 
          : 
          <AiTwotoneAudio 
          className='recording_blink' 
          style={{color: 'red'}}
          onClick={() => { 
          handleStopRecordAudio() 
          }}/>}
    </>
  )
}

export default RecordingAudio