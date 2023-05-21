import navigator from 'navigator';
export const isMicrophoneInUse = async () => {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((device) => device.kind === 'audioinput');
    
        const microphoneInUse = audioInputs.some((input) => input.label !== '');
        return microphoneInUse;
      } catch (error) {
        return false;
      }
  };