const container = document.querySelector(".container"),
  mainVideo = container.querySelector(".video"),
  videoTimeline = container.querySelector(".video-timeline"),
  currentVidTime = container.querySelector(".current-time"),
  videoDuration = container.querySelector(".video-duration"),
  playPauseBtn = container.querySelector(".play-pause i"),
  progressBar = container.querySelector(".progress-bar"),
  skipBackward = container.querySelector(".skip-backward i"),
  skipForward = container.querySelector(".skip-forward i"),
  volumeBtn = container.querySelector(".volume i"),
  volumeSlider = container.querySelector(".volume-slider"),
  speedBtn = container.querySelector(".playback-speed i"),
  speedOptions = container.querySelector(".speed-options");

function handlePlayPause() {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
}

playPauseBtn.addEventListener("click", handlePlayPause);

mainVideo.addEventListener("click", handlePlayPause);

function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60) % 60;
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;
  if (hours == "00") {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
}

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let progress = (currentTime / duration) * 100;
  progressBar.style.width = `${progress}%`;
  currentVidTime.innerText = formatTime(currentTime);
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  let timelineOffset = e.offsetX;
  let progress = (timelineOffset / timelineWidth) * mainVideo.duration;
  mainVideo.currentTime = progress;
});

videoTimeline.addEventListener("mousemove", (e) => {
  const progressTime = videoTimeline.querySelector("span");
  let offset = e.offsetX;
  progressTime.style.left = `${offset}px`;
  let timelineWidth = videoTimeline.clientWidth;
  let percent = (offset / timelineWidth) * mainVideo.duration;
  progressTime.innerText = formatTime(percent);
});

skipBackward.addEventListener("click", () => {
  mainVideo.currentTime -= 5;
});
skipForward.addEventListener("click", () => {
  mainVideo.currentTime += 5;
});
volumeBtn.addEventListener("click", () => {
  if (!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 1;
    volumeBtn.classList.replace("fa-volume-mute", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-mute");
  }
  volumeSlider.value = mainVideo.volume;
  //   mainVideo.muted = !mainVideo.muted;
  //   volumeBtn.classList.toggle("fa-volume-up");
  //   volumeBtn.classList.toggle("fa-volume-mute");
});
volumeSlider.addEventListener("input", (e) => {
  mainVideo.volume = e.target.value;
  if (e.target.value == 0) {
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-mute");
  } else {
    volumeBtn.classList.replace("fa-volume-mute", "fa-volume-high");
  }
});

mainVideo.addEventListener("play", () => {
  playPauseBtn.classList.replace("fa-play", "fa-pause");
});
mainVideo.addEventListener("pause", () => {
  playPauseBtn.classList.replace("fa-pause", "fa-play");
});
//
mainVideo.addEventListener("waiting", () => {
  //   loadingIndicator.style.display = "block";
});

mainVideo.addEventListener("canplay", () => {
  //   loadingIndicator.style.display = "none";
});
mainVideo.addEventListener("loadeddata", (e) => {
  videoDuration.innerText = formatTime(e.target.duration);
});
//
speedBtn.addEventListener("click", () => {
  speedOptions.classList.toggle("show");
});
speedOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", (e) => {
    mainVideo.playbackRate = Number(e.target.dataset.speed);
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  if (e.target !== speedBtn) {
    speedOptions.classList.remove("show");
  }
});
