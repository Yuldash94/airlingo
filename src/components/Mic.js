import React, { useEffect, useState } from 'react'
import { AiFillAudio, AiTwotoneAudio } from 'react-icons/ai'
import MicRecorder from "mic-recorder-to-mp3";

function Mic( { setAudio, audio, uploadAudio } ) {

    const [recording, setRecording] = useState(false)
    const recorder = new MicRecorder({
        bitRate: 128
      });
    const handleRecordAudio = () => {
        setRecording(true)
        recorder.start().then(() => {
            console.log('recording start');
          }).catch((e) => {
            console.error(e);
          });
      }
      
      const handleStopRecordAudio = () => {
        setRecording(false)
        recorder
            .stop()
            .getMp3().then(([buffer, blob]) => {
                console.log('MP3_blob: ', blob);
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                  });
            const player = new Audio(URL.createObjectURL(file));
            player.play();
            
            }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
            });
      }

    useEffect(() => {

    }, [])

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

export default Mic