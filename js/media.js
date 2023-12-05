/**
 * Format time in seconds to '00:00s' format
 * @param {number} time - The time in seconds
 * @returns {string} The formatted time
 */
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}s`;
}

/**
 * Handle video controls
 * @param {HTMLVideoElement} video - The video element
 * @param {string} playButtonId - The id of the play button
 * @param {string} pauseButtonId - The id of the pause button
 * @param {string} stopButtonId - The id of the stop button
 * @param {string} muteButtonId - The id of the mute button
 * @param {string} volumeSliderId - The id of the volume slider
 * @param {string} timeInputId - The id of the time input
 */
function handleVideoControls(
  video,
  playButtonId,
  pauseButtonId,
  stopButtonId,
  muteButtonId,
  volumeSliderId,
  timeInputId,
) {
  const playButton = document.getElementById(playButtonId);
  const pauseButton = document.getElementById(pauseButtonId);
  const stopButton = document.getElementById(stopButtonId);
  const muteButton = document.getElementById(muteButtonId);
  const volumeSlider = document.getElementById(volumeSliderId);
  const timeInput = document.getElementById(timeInputId);

  playButton.addEventListener("click", function () {
    video.play();
  });

  pauseButton.addEventListener("click", function () {
    video.pause();
  });

  stopButton.addEventListener("click", function () {
    video.pause();
    video.currentTime = 0;
  });

  muteButton.addEventListener("click", function () {
    video.muted = !video.muted;
  });

  volumeSlider.addEventListener("input", function () {
    video.volume = volumeSlider.value;
  });

  video.addEventListener("timeupdate", function () {
    timeInput.value = formatTime(video.currentTime);
  });

  timeInput.addEventListener("input", function () {
    video.currentTime = parseFloat(timeInput.value);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const video1 = document.getElementById("video");

  handleVideoControls(
    video1,
    "playButton",
    "pauseButton",
    "stopButton",
    "muteButton",
    "volumeSlider",
    "timeInput",
  );
});
