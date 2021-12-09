// KNOB
var num = 360;
var array = [];
var angle;

for(var i = 0; i < num + 1; i++) {
	array.push(i*(360/num));
}

Draggable.create("#knob", {
	type: "rotation",
	onDrag: function() {
		angle = $("#knob")[0]._gsTransform.rotation;

		if (angle < 0) angle += 360;
		else if (angle > 360) angle -= 360;
		else if (angle == 360) angle = 360;
	},
	onDragEnd: function() {
		TweenMax.to("#knob", 1, {rotation:closest(array, angle) + "_short"});
	}
});

function closest(array, num) {
	var i = 0;
	var minDiff = 1000;
	var ans;
	for(i in array) {
		var m = Math.abs(num-array[i]);
		if(m < minDiff){
			minDiff = m;
			ans = array[i];
		}
	}
	return ans;
}

// PLAY BUTTON
var audio = document.getElementById("audio");
var playIcon = document.getElementById("play-button");
var fileName = document.getElementById("audio").title;
var currentSong = document.getElementById("current-song");
var timeline = document.getElementById("timeline");
var soundButton = document.getElementById("sound-button"),
     soundIcon = `
      <div id="sound-icon"><span></span></div>`,
      muteIcon = `
      <div id="mute-icon"><span></span></div>`;

playIcon.addEventListener("click", playPause, false);

function playPause() {
  if (!audio.paused) {
    audio.pause();
    playIcon.classList.remove("pause");
    playIcon.classList.add("play");
    currentSong.innerHTML = "";
  } else {
    audio.play();
    playIcon.classList.remove("play");
    playIcon.classList.add("pause");
    currentSong.innerHTML = fileName;
  }
}

function changeTimelinePosition () {
  const percentagePosition = (100*audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}

audio.ontimeupdate = changeTimelinePosition;

function audioEnded () {
  playIcon.classList.remove("pause");
  playIcon.classList.add("play");
}

audio.onended = audioEnded;

function changeSeek () {
  const time = (timeline.value * audio.duration) / 100;
  audio.currentTime = time;
}

timeline.addEventListener('change', changeSeek);

function toggleSound () {
  audio.muted = !audio.muted;
  soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
}

soundButton.addEventListener('click', toggleSound);