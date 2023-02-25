import React, { useEffect, useState } from 'react'
import { AiFillAudio, AiTwotoneAudio } from 'react-icons/ai'
import MicRecorder from 'mic-recorder-to-mp3';
import { useAudioRecorder } from 'react-audio-voice-recorder';

export default function AudioRecording( { setAudio, audio, uploadAudio } ) {
    

  // const Mp3Recorder = new MicRecorder({ bitRate: 128 });
  // const [recording, setRecording] = useState(false)
  // const [isBlocked, setIsBlocked] = useState(false)
  // const handleRecordAudio = () => {
  //   if (isBlocked) {
  //     alert('Microphone access Denied')
  //   } else {
  //     Mp3Recorder.start()
  //     .then(() => {
  //         setRecording(true)
  //       }).catch((e) => console.error(e))
  //   }
  // }
  // const handleStopRecordAudio = () => {
  //   Mp3Recorder.stop()
  //   .getMp3().then(([finalBuffer, blob]) => {
  //       setRecording(false)
  //       setAudio(blob)
  //       let audioFile = new FormData() 
  //       if (audio !== blob && blob) {
  //           console.log('getMp3_blob:', blob)
  //           // console.log('data1', audioFile)
  //           audioFile.set("formFile", blob)
  //           uploadAudio(audioFile)
  //           // console.log('data2', audioFile.get('formFile'))
  //         }
  //     }).catch((e) => console.log(e));
  // };
  // useEffect(() => {
  //   window.navigator.getUserMedia({ audio: true },
  //     () => {
  //       console.log('Microphone access Granted')
  //       setIsBlocked(false)
  //     },
  //     () => {
  //       console.log('Microphone access Denied')
  //       setIsBlocked(true)
  //     },
  //   )
  // }, [])


  const {
    startRecording,
    stopRecording,
    recordingBlob,
  } = useAudioRecorder();
  const [recording, setRecording] = useState(false)

  
  const handleRecordAudio = () => {
    setRecording(true)
    startRecording()
  }
  
  const handleStopRecordAudio = () => {
    setRecording(false)
    stopRecording()
  }

  let audioFile = new FormData() 

    useEffect(()=> {
      if (recordingBlob) {
        console.log(recordingBlob);
        setAudio(recordingBlob)
        audioFile.set("formFile", recordingBlob)
        console.log('data2', audioFile.get('formFile'))
        uploadAudio(audioFile)
      }

    }, [recordingBlob])
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
