document.addEventListener("DOMContentLoaded", function () {
    const playButtons = document.querySelectorAll(".play-button");
    const playPauseButton = document.getElementById("play-pause-button");
    const progressBar = document.getElementById("progress-bar");
    const progress = document.getElementById("progress");
    const volumeSlider = document.getElementById("volume-slider");
    const volumeDownButton = document.getElementById("volume-down");
    const volumeUpButton = document.getElementById("volume-up");
    const currentTimeSpan = document.getElementById("current-time");
    const totalTimeSpan = document.getElementById("total-time");
    const musicPlayer = document.getElementById("music-player");
    const playModeButton = document.getElementById("play-mode-button");

    let audio = new Audio();
    let isPlaying = false;
    let isDragging = false;
    let playMode = 'loop'; // 初始模式为单曲循环
    let currentTrackIndex = 0;

    const tracks = [
        { src: '/Music/NI.mp3', title: 'NI' },
        { src: '/Music/WHO.mp3', title: 'WHO' }
    ];

    playPauseButton.addEventListener("click", togglePlayPause);

    playButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            currentTrackIndex = index;
            const musicSrc = button.parentElement.getAttribute("data-music-src");
            if (audio.src !== musicSrc) {
                audio.src = musicSrc;
                isPlaying = false;
            }
            if (!isPlaying) {
                audio.play();
                isPlaying = true;
                playPauseButton.textContent = "暂停";
            } else {
                audio.pause();
                isPlaying = false;
                playPauseButton.textContent = "播放";
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
        if (!isDragging) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = progressPercent + "%";
            currentTimeSpan.textContent = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener("loadedmetadata", () => {
        totalTimeSpan.textContent = formatTime(audio.duration);
    });

    currentTimeSpan.addEventListener("click", () => {
        const newTime = prompt("输入新的时间 (格式：分钟:秒)：", currentTimeSpan.textContent);
        if (newTime) {
            const timeParts = newTime.split(":");
            const minutes = parseInt(timeParts[0]);
            const seconds = parseInt(timeParts[1]);
            const newCurrentTime = minutes * 60 + seconds;
            if (!isNaN(newCurrentTime) && newCurrentTime <= audio.duration) {
                audio.currentTime = newCurrentTime;
                currentTimeSpan.textContent = formatTime(audio.currentTime);
            }
        }
    });

    progressBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        updateProgressBar(e);
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            updateProgressBar(e);
        }
    });

    progressBar.addEventListener("click", updateProgressBar);

    playModeButton.addEventListener("click", () => {
        switch (playMode) {
            case 'loop':
                playMode = 'sequence';
                playModeButton.textContent = '顺序播放';
                break;
            case 'sequence':
                playMode = 'random';
                playModeButton.textContent = '随机播放';
                break;
            case 'random':
                playMode = 'loop';
                playModeButton.textContent = '单曲循环';
                break;
        }
    });

    audio.addEventListener("ended", () => {
        switch (playMode) {
            case 'loop':
                audio.currentTime = 0;
                audio.play();
                break;
            case 'sequence':
                currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
                playMusic(tracks[currentTrackIndex].src);
                break;
            case 'random':
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * tracks.length);
                } while (randomIndex === currentTrackIndex);
                currentTrackIndex = randomIndex;
                playMusic(tracks[currentTrackIndex].src);
                break;
        }
    });

    function togglePlayPause() {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
            playPauseButton.textContent = "暂停";
        } else {
            audio.pause();
            isPlaying = false;
            playPauseButton.textContent = "播放";
        }
    }

    function toggleMusicPlayer(isPlaying) {
        if (isPlaying) {
            musicPlayer.classList.add("active");
        } else {
            musicPlayer.classList.remove("active");
        }
    }

    function playMusic(src) {
        audio.src = src;
        audio.play();
        isPlaying = true;
        playPauseButton.textContent = "暂停";
        toggleMusicPlayer(isPlaying);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    function updateProgressBar(e) {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = offsetX / rect.width;
        const newTime = percentage * audio.duration;
        audio.currentTime = newTime;
        progress.style.width = percentage * 100 + "%";
        currentTimeSpan.textContent = formatTime(audio.currentTime);
    }
});
