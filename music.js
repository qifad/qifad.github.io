document.addEventListener("DOMContentLoaded", function () {
    const playButtons = document.querySelectorAll(".play-button");
    const playPauseButton = document.getElementById("play-pause-button");
    const progress = document.getElementById("progress");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeDownButton = document.getElementById("volume-down");
    const volumeUpButton = document.getElementById("volume-up");
    const currentTimeSpan = document.getElementById("current-time");
    const totalTimeSpan = document.getElementById("total-time");
    const musicPlayer = document.getElementById("music-player");

    let audio = new Audio();
    let isPlaying = false;

    playPauseButton.addEventListener("click", togglePlayPause);

    playButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (!isPlaying) {
                playMusic(button.parentElement.getAttribute("data-music-src"));
                isPlaying = true;
            } else {
                audio.pause();
                isPlaying = false;
            }
            toggleMusicPlayer(isPlaying);
        });
    });

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value / 100;
    });

    volumeDownButton.addEventListener("click", () => {
        if (audio.volume > 0) {
            audio.volume -= 0.1;
            volumeSlider.value = audio.volume * 100;
        }
    });

    volumeUpButton.addEventListener("click", () => {
        if (audio.volume < 1) {
            audio.volume += 0.1;
            volumeSlider.value = audio.volume * 100;
        }
    });

    audio.addEventListener("timeupdate", () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = progressPercent + "%";
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("loadedmetadata", () => {
        totalTimeSpan.textContent = formatTime(audio.duration);
    });

    function togglePlayPause() {
        if (!isPlaying) {
            playMusic(audio.src);
            isPlaying = true;
            playPauseButton.textContent = "播放";
        } else {
            audio.pause();
            isPlaying = false;
            playPauseButton.textContent = "暂停";
        }
    }

    function playMusic(src) {
        audio.src = src;
        audio.play();
    }

    function toggleMusicPlayer(isPlaying) {
        if (isPlaying) {
            musicPlayer.classList.add("active");
        } else {
            musicPlayer.classList.remove("active");
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
});
