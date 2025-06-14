export class MicrophoneTranscriber {
  constructor() {
    console.warn('MicrophoneTranscriber is a stub for web environment.');
  }

  startTranscribing(): Promise<void> {
    console.warn('startTranscribing not implemented for web.');
    return Promise.resolve();
  }

  stopTranscribing(): Promise<string> {
    console.warn('stopTranscribing not implemented for web.');
    return Promise.resolve('');
  }

  on(event: string, listener: (...args: any[]) => void): void {
    console.warn(`Event listener for ${event} not implemented for web.`);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    console.warn(`Event listener for ${event} not implemented for web.`);
  }
}
