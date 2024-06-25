document.addEventListener('DOMContentLoaded', (event) => {
    verifyVideoPlayback('your-video-file.mp4')
        .then(() => {
            console.log('Video playback verified to the end');
            // Additional actions after video completion can be added here
        })
        .catch((error) => {
            console.error(error);
        });
});

function verifyVideoPlayback(videoSrc) {
    return new Promise((resolve, reject) => {
        let video = findVideoBySrc(videoSrc);

        if (video) {
            playVideoAndSeekToEnd(video)
                .then(resolve)
                .catch(reject);
        } else {
            reject(new Error('Video with the specified source not found'));
        }
    });

    // Function to find the video element by its source link
    function findVideoBySrc(src) {
        const videos = document.querySelectorAll('video');
        for (let video of videos) {
            const sources = video.getElementsByTagName('source');
            for (let source of sources) {
                if (source.src.includes(src)) {
                    return video;
                }
            }
        }
        return null;
    }

    // Function to play the video, seek to the end, and wait for its completion
    function playVideoAndSeekToEnd(video) {
        return new Promise<void>((resolve, reject) => {
            if (!video) {
                reject(new Error('Video element not found'));
            }

            // Add an event listener to resolve the promise when the video ends
            video.addEventListener('ended', () => {
                console.log('Video has ended');
                resolve();
            }, { once: true });

            // Start playing the video
            video.play().then(() => {
                // Seek to the end of the video
                video.currentTime = video.duration - 1;
            }).catch((error) => {
                reject(new Error('Error playing video: ' + error.message));
            });
        });
    }
}
