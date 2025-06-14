export class MicrophoneRecorder {
  constructor() {
    console.warn('MicrophoneRecorder is a stub for web environment.');
  }

  startRecording(): Promise<void> {
    console.warn('startRecording not implemented for web.');
    return Promise.resolve();
  }

  stopRecording(): Promise<string> {
    console.warn('stopRecording not implemented for web.');
    return Promise.resolve('');
  }

  isRecording(): boolean {
    return false;
  }

  on(event: string, listener: (...args: any[]) => void): void {
    console.warn(`Event listener for ${event} not implemented for web.`);
  }

  off(event: string, listener: (...args: any[]) => void): void {
    console.warn(`Event listener for ${event} not implemented for web.`);
  }
}
