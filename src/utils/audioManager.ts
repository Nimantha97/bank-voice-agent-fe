class AudioManager {
  private currentAudio: HTMLAudioElement | null = null;

  play(audioUrl: string, onEnded?: () => void, onError?: () => void): void {
    this.stop();

    const audio = new Audio(audioUrl);
    this.currentAudio = audio;

    audio.onended = () => {
      this.currentAudio = null;
      onEnded?.();
    };

    audio.onerror = () => {
      this.currentAudio = null;
      onError?.();
    };

    audio.play();
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  isPlaying(): boolean {
    return this.currentAudio !== null && !this.currentAudio.paused;
  }
}

export const audioManager = new AudioManager();
