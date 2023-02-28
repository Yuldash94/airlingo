import React, { useEffect } from 'react'
import { AiFillAudio, AiTwotoneAudio } from 'react-icons/ai'

function MicRecord({ setAudio, audio, uploadAudio }) {

    const [recording, setRecording] = useState(false)
    
    useEffect(() => {

    },[])

    const handleRecordAudio = () => {
        setRecording(true)
        let mic = new window.p5.AudioIn()
        mic.start()
        let recorder = new window.p5.SoundRecorder()
        recorder.setInput(mic)
    }
    
    const handleStopRecordAudio = () => {
        setRecording(false)
    }

    

  return (
    <>
    {!recording ? 
      <AiFillAudio 
      onClick={handleRecordAudio}/> 
      : 
      <AiTwotoneAudio 
      className='recording_blink' 
      style={{color: 'red'}}
      onClick={handleStopRecordAudio}/>}
</>
  )
}

export default MicRecord