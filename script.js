
let songs = [];
// cross function
let cross = document.querySelector("#cross-i");
cross.addEventListener("click", (e) => {
  let l = document.querySelector(".left");
  l.style.left = "-100%";
});
// ham function
let ham = document.querySelector("#ham-i");
ham.addEventListener("click", (e) => {
  let l = document.querySelector(".left");
  l.style.left = "0%";
});
// adding listener for locating user on the home page
let part = document.querySelector(".part");
part.addEventListener("click", (e) => {
  window.location.replace(
    "http://127.0.0.1:5500/Projects/Project%20Spotify/index.html"
  );
});
// showing all hidden folders
let show = document.getElementById("show");
show.addEventListener("click", (e) => {
  document.querySelectorAll(".artist").forEach((e) => {
    e.setAttribute("style", "display:block");
  });
});
// adding event listener on the folders for calling the fetch function
document.querySelectorAll(".artist").forEach((e) => {
  e.addEventListener("click", (e) => {
//     let song = document.querySelector("#song");
// song.src="/audios/Karan_Aujla/Adhiya-Karan_Aujla.mp3";
// song.play();
    let a = e.currentTarget.getElementsByTagName("p");
    let name = a[0].innerHTML;
    fetchsong(name);
  });
});
// time function
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}
// previous song
let prev = document.querySelector("#prev");
prev.addEventListener("click", (e) => {
  let prevText = song.src.split("audios/")[1];
  let index = songs.indexOf(prevText);
  if (index == 0) {
    index = songs.length - 1;
    playmusic(songs[index]);
  } else {
    playmusic(songs[index - 1]);
  }
});
// next song
let next = document.querySelector("#next");
next.addEventListener("click", (e) => {
  let nextText = song.src.split("audios/")[1];
  let index = songs.indexOf(nextText);
  if (index == songs.length - 1) {
    playmusic(songs[0]);
  } else {
    playmusic(songs[index + 1]);
  }
});
// playing the current song

let input = document.querySelector("#input");
function playmusic(track) {
  song.src = `http://127.0.0.1:5500/Projects/Project%20Spotify/audios/${track}`;
  song.play();
  let p = document.querySelector(".para1");
  let text = track.split("/")[1].split("-")[0].replaceAll("%20", " ");
  p.innerHTML = text;
  image.setAttribute("src", "icons/pause.svg");
  image.classList.remove("pause");
  image.classList.add("play");
  song.onloadedmetadata = function () {
    input.max = song.duration;
    input.value = song.currentTime;
    updateRangeBackground();
  };
}
// function for updating input range with song time
song.addEventListener("timeupdate", function () {
  input.value = song.currentTime;
  let p2 = document.querySelector(".para2");
  let d = formatTime(song.duration);
  p2.innerHTML = `${formatTime(song.currentTime)}/${d}`;
  updateRangeBackground();
});
// function for updating song time with input range
input.addEventListener("input", function () {
  song.currentTime = input.value;
  updateRangeBackground();
});
// function for input range for showing background
function updateRangeBackground() {
  let value = input.value;
  let max = input.max;
  let percentage = (value / max) * 100;
  input.style.background = `linear-gradient(to right, white ${percentage}%, #555 ${percentage}%)`;
}
// controlling song using play button
let player = document.querySelector(".player-box");
let image = document.querySelector("#player");
player.addEventListener("click", (e) => {
  if (image.classList.contains("pause")) {
    song.play();
    image.setAttribute("src", "icons/pause.svg");
    image.classList.remove("pause");
    image.classList.add("play");
  } else {
    song.pause();
    image.setAttribute("src", "icons/player.svg");
    image.classList.remove("play");
    image.classList.add("pause");
  }
});
// fetching the songs of the folder on which user has clicked
async function fetchsong(name) {
  // let data = await fetch("https://github.com/suraj-auth/project-spotify/tree/main/audios/Karan_Aujla");
  /* let data = await fetch();
    `http://127.0.0.1:5500/Projects/Project%20Spotify/audios/${name}`
  );*/
  fetch('https://github.com/suraj-auth/project-spotify/tree/main/audios')
  .then(response => {
    if (!response.ok) {
      console.log("not");
    }
    console.log("ok");
  })
  console.log("type of data = " +  typeof data);
  console.log("value of data = " + data);
  let response = await data.text();
  console.log("type of response = " + typeof response);
  console.log("value of response = " + response);
  let div = document.createElement("div");
  div.innerHTML = response;
  console.log(data);
  // console.log(response);
  let as = div.getElementsByTagName("a");
  // storing songs in an array
  songs = [];
  for (let i = 0; i < as.length; i++) {
    const element = as[i];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/audios/")[1]);
    }
  }
  let list = document.querySelector("#list");
  list.innerHTML = "";
  // listing all songs in the unordered list
  for (const iterator of songs) {
    let songname = iterator.split("-")[0].split("/")[1].replaceAll("%20", " ");
    list.innerHTML =
      list.innerHTML +
      `<li><div id="event-box" class="music-box bdr1 flex">
    <img src="icons/music.svg" alt="" />
    <div class="music-name">
      <p class="p1">${songname}</p>
      <p class="p2">${name}</p>
      <p class="p3" style="display:none">${iterator}</p>
    </div>
    <img src="icons/play.svg" alt="" />
  </div></li>`;
  }
  if (
    song.src == "http://127.0.0.1:5500/Projects/Project%20Spotify/index.html"
  ) {
    let s = song.src.split("index")[0];
    song.src = `${s}audios/${songs[0]}`;
  }
  listed();
}
// adding event listener on list for calling the play function on user click
function listed() {
  let l = document.querySelector("#list").getElementsByTagName("li");
  for (const iterator of l) {
    iterator.addEventListener("click", (e) => {
      let div = iterator.getElementsByClassName("music-name");
      let disc = document.createElement("div");
      disc.innerHTML = div[0].innerHTML;
      let para = disc.querySelector(".p3");
      playmusic(para.innerHTML);
    });
  }
}
