/**const videoFrame = document.getElementById('video-div');
const iframe = document.getElementById('youtubePlayer');
const videoPlayButton = document.getElementById('videoPlayButton');
const videoStopButton = document.getElementById("videoStopButton"); // Replace with the appropriate ID for your stop button

let isPlaying = false;**/
/**
function playVideo() {
    let iframeSrc = iframe.getAttribute("src");/**
    if (iframeSrc === modifiedDescriptions[count]) {
        if (iframe.src === "") {
            iframe.src = modifiedDescriptions[count];
            isPlaying = true;
            iframe.classList.remove('hidden');
        }
        if (iframe.contentWindow && iframe.contentWindow.postMessage) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            isPlaying = true;
            iframe.classList.remove('hidden');
        }
    } else {
        iframe.setAttribute("src", modifiedDescriptions[count]);
        isPlaying = true;
        iframe.classList.remove('hidden');
    }
    iframeSrc = modifiedDescriptions[count];
    iframe.classList.remove('hidden');
}
**/
/**
function stopAndHideVideo() {
    iframe.setAttribute("src", "");
    isPlaying = false;
    videoFrame.classList.add('hidden');
    console.log(`pressed video stop btn`);
}

videoPlayButton.addEventListener("click", () => {
  /**  if (!isPlaying) {
        playVideo();
    } else {
        // Add your logic for pausing the video here
    }
    iframe.setAttribute("src", modifiedDescriptions[count]);
    isPlaying = true;
    videoFrame.classList.remove('hidden');
    
    console.log(`pressed video play btn, iframe src: ${modifiedDescriptions[count]}`)
});

videoStopButton.addEventListener("click", stopAndHideVideo);
**/
const playButton = document.getElementById("videoPlayButton");
const stopButton = document.getElementById("videoStopButton");
const videoDiv = document.getElementById("video-div");
const youtubePlayer = document.getElementById("youtubePlayer");

let isPlaying = false;

function playVideo() {
    let iframeSrc = youtubePlayer.getAttribute("src");
    if (iframeSrc === modifiedDescriptions[count]) {
        if (youtubePlayer.src === "") {
            youtubePlayer.src = modifiedDescriptions[count];
            isPlaying = true;
            videoDiv.classList.remove("hidden");
        }
        if (youtubePlayer.contentWindow && youtubePlayer.contentWindow.postMessage) {
            youtubePlayer.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            isPlaying = true;
            videoDiv.classList.remove("hidden");
        }
    } else {
        youtubePlayer.setAttribute("src", modifiedDescriptions[count]);
        isPlaying = true;
        videoDiv.classList.remove("hidden");
    }
}

function stopAndHideVideo() {
    youtubePlayer.setAttribute("src", "");
    isPlaying = false;
    videoDiv.classList.add("hidden");
}

playButton.addEventListener("click", () => {
    if (!isPlaying) {
        playVideo();
    } else {
        // Add your logic for pausing the video here
    }
});

stopButton.addEventListener("click", stopAndHideVideo);
