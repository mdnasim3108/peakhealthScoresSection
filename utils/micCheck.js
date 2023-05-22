async function checkMicrophoneConflict() {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create an AudioContext
    // const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    console.log(AudioContext)
    console.log(audioContext)
    // Create an audio source from the microphone stream
    const microphoneSource = audioContext.createMediaStreamSource(stream);
    
    // Check if the microphone is already in use by another application
    console.log(microphoneSource)
    console.log(audioContext.state)
    console.log(microphoneSource.active)
    if (audioContext.state === 'running' && microphoneSource.mediaStream.active)  {
      console.log('Microphone is in use by another application');
      alert('The microphone is in use by another application. Please close the conflicting application and try again.');
      return;
    }

    // Proceed with recording or other operations using the microphone stream

  } catch (error) {
    // Handle error (e.g., user denied microphone access)
    console.error('Error accessing microphone:', error);
    alert('Unable to access the microphone. Please ensure that the microphone is properly connected and allowed access to this web app.');
  }
}
export default checkMicrophoneConflict;