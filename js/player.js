const audio = document.getElementById('audioPlayer');
const playIcon = document.getElementById('playIcon');

const progressBar = document.getElementById('progress');
let currentTime = document.getElementById('current-time');
let totalTime = document.getElementById('total-time');

audio.addEventListener('timeupdate', function() {
  var percentage = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percentage + '%';
  currentTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('loadedmetadata', function() {
  totalTime.textContent = formatTime(audio.duration);
});

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var seconds = Math.floor(seconds % 60);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function playAudio() {
  
    if (audio.paused) {
        playIcon.src = "pause.png";
        
        loadAudio(count);
        
        //rotateImg();
        audio.play().catch(error => {
            console.error("Error playing audio:", error);
        });
    } else {
        playIcon.src = "play.png";
       
        audio.pause();
    }
}

function loadAudio(index) {
    audio.src = audioList[index];
    audio.load(); // Load the new audio source
    audio.addEventListener("canplaythrough", () => {
        // Ensure the audio is ready before playing
        //audioPlayer.play();
    });
}

playIcon.addEventListener("click", playAudio);

audio.addEventListener('timeupdate', function() {
  
  var progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = progress + '%';
});