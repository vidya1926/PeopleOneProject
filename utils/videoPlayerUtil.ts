// VideoPlayer.ts
export class VideoPlayer {
    private video: HTMLVideoElement;

    constructor(videoElementId: string) {
        this.video = document.getElementById(videoElementId) as HTMLVideoElement;
        if (!this.video) {
            throw new Error(`No video element found with id ${videoElementId}`);
        }
    }

    playVideo(): void {
        this.video.play();
    }

    pauseVideo(): void {
        this.video.pause();
    }

    stopVideo(): void {
        this.video.pause();
        this.video.currentTime = 0;
    }

    muteVideo(): void {
        this.video.muted = true;
    }

    unmuteVideo(): void {
        this.video.muted = false;
    }

    setVolume(volume: number): void {
        if (volume >= 0 && volume <= 1) {
            this.video.volume = volume;
        } else {
            console.error("Volume must be between 0.0 and 1.0");
        }
    }

    seekTo(seconds: number): void {
        if (seconds >= 0 && seconds <= this.video.duration) {
            this.video.currentTime = seconds;
        } else {
            console.error("Seconds must be between 0 and the duration of the video");
        }
    }

    forward(seconds: number): void {
        const newTime = this.video.currentTime + seconds;
        if (newTime <= this.video.duration) {
            this.video.currentTime = newTime;
        } else {
            this.video.currentTime = this.video.duration;
        }
    }
}
