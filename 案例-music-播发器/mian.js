var songs = [
  {
    songName: "Dawn",
    artist: "Skylike",
    album: "1.jpg",
    url: "1.mp3",
  },
  {
    songName: "Me & You",
    artist: "Alex Skrindo",
    album: "2.jpg",
    url: "2.mp3",
  },
];

var tuoing = false;

var player = document.querySelector(".player");
var progress = player.querySelector(".progress");
var input = progress.querySelector("input");
var audio = document.querySelector("audio");

input.oninput = function (event) {
  console.log(event.target.value);
  //   v
  var v = event.target.value;
  progress.querySelector(".x").style.width = v + "%";
  progress.querySelector(".dot").style.left = v + "%";
  tuoing = true;
};

input.onchange = function (event) {
  var v = event.target.value;
  audio.currentTime = (v / 100) * audio.duration;
  tuoing = false;
};

audio.onplay = function () {
  player.classList.add("playing");
};
audio.onpause = function () {
  player.classList.remove("playing");
};

audio.ontimeupdate = function () {
  if (!tuoing) {
    //   console.log(audio.currentTime, audio.duration);
    //   console.log((audio.currentTime / audio.duration) * 100);
    var v = (audio.currentTime / audio.duration) * 100;

    input.value = v;
    progress.querySelector(".x").style.width = v + "%";
    progress.querySelector(".dot").style.left = v + "%";
  }
};

document.querySelector(".fa-play").onclick = function () {
  audio.play();
};

document.querySelector(".fa-pause").onclick = function () {
  audio.pause();
};
