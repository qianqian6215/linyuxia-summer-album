const players = Array.from(document.querySelectorAll("audio"));
const panel = document.querySelector("[data-player-panel]");
const cover = document.querySelector("[data-player-cover]");
const backdrop = document.querySelector("[data-player-backdrop]");
const title = document.querySelector("[data-player-title]");
const note = document.querySelector("[data-player-note]");
const lyricWindow = document.querySelector("[data-lyrics]");
const progress = document.querySelector("[data-player-progress]");
const toggleButton = document.querySelector("[data-player-toggle]");
const prevButton = document.querySelector("[data-player-prev]");
const nextButton = document.querySelector("[data-player-next]");
const closeButton = document.querySelector("[data-close-player]");
const openButtons = Array.from(document.querySelectorAll("[data-open-player]"));
const trackCards = Array.from(document.querySelectorAll(".track"));

const tracks = [
  {
    title: "寄往夏天",
    note: "出发前一晚，行李箱摊在地板上，群聊还在跳，窗外的蝉鸣把夏夜拉得很长。",
    cover: "./assets/images/summer-postcard.jpg",
    lyrics: [
      { time: 10, text: "行李箱摊在地板上" },
      { time: 15, text: "月亮还剩半个光" },
      { time: 20, text: "群聊里有人说别迟到" },
      { time: 26, text: "又发来一张笑的表情包" },
      { time: 30, text: "后续歌词整理中" },
    ],
  },
  {
    title: "蓝色路牌",
    note: "车窗摇下，海风先跑进来。城市被留在后视镜里，朋友们终于开向海岸线。",
    cover: "./assets/images/blue-road-sign.jpg",
    lyrics: [
      { time: 11, text: "有人迟到也笑得自然" },
      { time: 15, text: "随手塞进的薯片两三罐" },
      { time: 19, text: "脑袋里没有设置终点站" },
      { time: 23, text: "青春的电量总是用不完" },
      { time: 27, text: "后续歌词整理中" },
    ],
  },
  {
    title: "便利店晚风",
    note: "沿海路边短暂停靠，冰淇淋快化了，汽水罐冒着水珠，日落还在等下一站。",
    cover: "./assets/images/convenience-breeze.jpg",
    lyrics: [
      { time: 8, text: "车停在能看见海的路边" },
      { time: 11, text: "后座堆着拖鞋和照片" },
      { time: 15, text: "自动门叮咚一声打开" },
      { time: 18, text: "冷气把太阳推远一点" },
      { time: 22, text: "你说冰淇淋快要化了" },
      { time: 25, text: "我说地图也看花了眼" },
      { time: 30, text: "后续歌词整理中" },
    ],
  },
  {
    title: "日落未送达",
    note: "有些话停在输入框里，像风绕过指尖。日落终于到了海边，人却没有认真告别。",
    cover: "./assets/images/sunset-undelivered.jpg",
    lyrics: [
      { time: 0, text: "午夜的钟声回荡在空巷" },
      { time: 7, text: "街角咖啡店还亮着微光" },
      { time: 15, text: "你留下的信纸泛黄" },
      { time: 19, text: "字里行间藏着过往" },
      { time: 24, text: "后续歌词整理中" },
    ],
  },
  {
    title: "海风明信片",
    note: "最后一张明信片不写地址，也不写期限。等风吹过窗前，请记得那年夏天。",
    cover: "./assets/images/sea-breeze-postcard.jpg",
    lyrics: [
      { time: 0, text: "我们坐在最后一片海边" },
      { time: 19, text: "鞋子还沾着下午的盐" },
      { time: 23, text: "蓝色路牌在身后很远" },
      { time: 27, text: "像一句没写完的再见" },
      { time: 31, text: "后续歌词整理中" },
    ],
  },
];

let currentIndex = 0;
let activeLyricIndex = -1;
let hasPlaybackStarted = false;

trackCards.forEach((card) => {
  const status = document.createElement("span");
  status.className = "track-status";
  status.setAttribute("aria-hidden", "true");
  card.append(status);
});

const renderLyrics = (track) => {
  lyricWindow.innerHTML = track.lyrics
    .map((line) => `<p class="lyric-line">${line.text}</p>`)
    .join("");
};

const updateTrackStates = () => {
  trackCards.forEach((card, index) => {
    const isCurrent = hasPlaybackStarted && index === currentIndex;
    const isPlaying = isCurrent && !players[index].paused;
    const status = card.querySelector(".track-status");

    card.classList.toggle("is-current", isCurrent);
    card.classList.toggle("is-playing", isPlaying);

    if (status) {
      status.textContent = isPlaying ? "正在播放" : "当前曲目";
    }
  });
};

const setCurrentTrack = (index) => {
  currentIndex = Math.max(0, Math.min(index, tracks.length - 1));
  const track = tracks[currentIndex];

  cover.src = track.cover;
  cover.alt = `${track.title} 封面`;
  title.textContent = track.title;
  note.textContent = track.note;
  backdrop.style.setProperty("--player-bg", `url("${track.cover}")`);
  renderLyrics(track);
  activeLyricIndex = -1;
  updateProgress();
  updateTrackStates();
};

const openPlayer = (index, shouldPlay = true) => {
  setCurrentTrack(index);
  panel.classList.add("is-open");
  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-open-player");

  if (shouldPlay) {
    hasPlaybackStarted = true;
    players[currentIndex].play().catch(() => {});
  }
};

const closePlayer = () => {
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-open-player");
};

const updateToggle = () => {
  toggleButton.textContent = players[currentIndex]?.paused ? "播放" : "暂停";
  updateTrackStates();
};

const updateProgress = () => {
  const player = players[currentIndex];
  const track = tracks[currentIndex];
  const duration = Number.isFinite(player.duration) ? player.duration : 0;
  const ratio = duration > 0 ? player.currentTime / duration : 0;
  const lines = Array.from(lyricWindow.querySelectorAll(".lyric-line"));
  const nextLyricIndex = track.lyrics.reduce((activeIndex, line, index) => {
    return player.currentTime >= line.time ? index : activeIndex;
  }, -1);

  progress.style.width = `${Math.max(0, Math.min(1, ratio)) * 100}%`;

  if (nextLyricIndex !== activeLyricIndex) {
    activeLyricIndex = nextLyricIndex;
    lines.forEach((line, index) => {
      line.classList.toggle("is-active", index === activeLyricIndex);
      line.classList.toggle("is-past", index < activeLyricIndex);
    });
  }

  updateToggle();
};

const playTrack = (index) => {
  hasPlaybackStarted = true;
  setCurrentTrack(index);
  players[currentIndex].play().catch(() => {});
};

const syncToPlayingTrack = (index) => {
  if (currentIndex !== index || panel.classList.contains("is-open")) {
    setCurrentTrack(index);
  } else {
    updateTrackStates();
  }

  updateToggle();
};

players.forEach((player, index) => {
  player.addEventListener("play", () => {
    hasPlaybackStarted = true;

    players.forEach((other) => {
      if (other !== player) {
        other.pause();
      }
    });

    syncToPlayingTrack(index);
  });

  player.addEventListener("playing", () => syncToPlayingTrack(index));
  player.addEventListener("pause", updateToggle);
  player.addEventListener("timeupdate", updateProgress);
  player.addEventListener("loadedmetadata", updateProgress);

  player.addEventListener("ended", () => {
    const nextIndex = index + 1;
    const nextPlayer = players[nextIndex];

    if (nextPlayer) {
      hasPlaybackStarted = true;
      setCurrentTrack(nextIndex);
      nextPlayer.play().then(() => syncToPlayingTrack(nextIndex)).catch(() => {});
    } else {
      updateTrackStates();
    }
  });
});

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openPlayer(Number(button.dataset.openPlayer || 0));
  });
});

toggleButton.addEventListener("click", () => {
  const player = players[currentIndex];

  if (player.paused) {
    player.play().catch(() => {});
  } else {
    player.pause();
  }
});

prevButton.addEventListener("click", () => {
  playTrack(currentIndex - 1 < 0 ? tracks.length - 1 : currentIndex - 1);
});

nextButton.addEventListener("click", () => {
  playTrack(currentIndex + 1 >= tracks.length ? 0 : currentIndex + 1);
});

closeButton.addEventListener("click", closePlayer);

panel.addEventListener("click", (event) => {
  if (event.target === panel) {
    closePlayer();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && panel.classList.contains("is-open")) {
    closePlayer();
  }
});

setCurrentTrack(0);
