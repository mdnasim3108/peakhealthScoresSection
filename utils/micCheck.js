import navigator from 'navigator';
export const isMicrophoneInUse = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      
      return false;
    }
  };