export async function playAndForwardVideo(locator: string) {
 
    try {
        await this.page.evaluate((selector) => {
            const video = document.querySelector(selector) as HTMLVideoElement | null;
            if (video) {
                video.play().then(() => {
                    console.log('Video is playing');
                    // Forward the video to the end after 2 seconds (adjust as needed)
                    setTimeout(() => {
                        video.currentTime = video.duration;
                        console.log('Video forwarded to the end');
                    }, 2000); // 2000 milliseconds = 2 seconds
                }).catch((error) => {
                    console.error('Error playing video:', error);
                });
            } else {
                console.error('Video element not found');
            }
        }, locator);
    } catch (error) {
        console.error('Error playing and forwarding video:', error);
    }

}