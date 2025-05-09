export function speakText(text: string, onEndCallback?: () => void, onErrorCallback?: (event: SpeechSynthesisErrorEvent) => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.error('Speech synthesis not supported in this environment.');
    if (onErrorCallback) {
      // @ts-expect-error TODO: utterance is not available here, this might be an issue
      onErrorCallback(new SpeechSynthesisErrorEvent('error', { error: 'synthesis-unavailable', utterance: null as SpeechSynthesisUtterance }));
    }
    return;
  }

  window.speechSynthesis.cancel(); // Clear any existing speech queue

  const utterance = new SpeechSynthesisUtterance(text);

  try {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      let preferredVoice = voices.find(voice => 
        voice.lang.toLowerCase().startsWith('en') &&
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('zira') || 
         voice.name.toLowerCase().includes('susan') ||
         voice.name.toLowerCase().includes('google us english'))
      );

      if (!preferredVoice) {
        preferredVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
      }

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      } else {
        console.warn('No suitable English voice found. Using system default voice.');
      }
    } else {
      console.warn('No voices loaded. TTS will use system default settings. Consider calling after voiceschanged event.');
    }
  } catch (e) {
    console.error('Error accessing voices:', e);
  }

  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    if (onEndCallback) {
      onEndCallback();
    }
  };

  utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
    console.error('TTS Utterance Error:', event.error, event);
    if (onErrorCallback) {
      onErrorCallback(event);
    }
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Error triggering speech synthesis speak():', e);
    if (onErrorCallback) {
      const errorEvent = new SpeechSynthesisErrorEvent('error', { 
        error: 'synthesis-failed', 
        utterance 
      });
      onErrorCallback(errorEvent);
    }
  }
}

export function cancelSpeech(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.error('Error cancelling speech synthesis:', e);
    }
  }
}