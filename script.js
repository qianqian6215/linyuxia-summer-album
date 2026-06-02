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
      { time: 0, text: "正式歌词整理中" },
      { time: 6, text: "这首歌的逐句歌词会在校对后更新" },
    ],
  },
  {
    title: "蓝色路牌",
    note: "车窗摇下，海风先跑进来。城市被留在后视镜里，朋友们终于开向海岸线。",
    cover: "./assets/images/blue-road-sign.jpg",
    lyrics: [
      { time: 0, text: "正式歌词整理中" },
      { time: 6, text: "这首歌的逐句歌词会在校对后更新" },
    ],
  },
  {
    title: "便利店晚风",
    note: "沿海路边短暂停靠，冰淇淋快化了，汽水罐冒着水珠，日落还在等下一站。",
    cover: "./assets/images/convenience-breeze.jpg",
    lyrics: [
      { time: 0, text: "正式歌词整理中" },
      { time: 6, text: "这首歌的逐句歌词会在校对后更新" },
    ],
  },
  {
    title: "日落未送达",
    note: "有些话停在输入框里，像风绕过指尖。日落终于到了海边，人却没有认真告别。",
    cover: "./assets/images/sunset-undelivered.jpg",
    lyrics: [
      { time: 0, text: "正式歌词整理中" },
      { time: 6, text: "这首歌的逐句歌词会在校对后更新" },
    ],
  },
  {
    title: "海风明信片",
    note: "最后一张明信片不写地址，也不写期限。等风吹过窗前，请记得那年夏天。",
    cover: "./assets/images/sea-breeze-postcard.jpg",
    lyrics: [
      { time: 0, text: "正式歌词整理中" },
      { time: 6, text: "这首歌的逐句歌词会在校对后更新" },
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

players.forEach((player, index) => {
  player.addEventListener("play", () => {
    hasPlaybackStarted = true;

    players.forEach((other) => {
      if (other !== player) {
        other.pause();
      }
    });

    if (panel.classList.contains("is-open")) {
      setCurrentTrack(index);
    } else {
      currentIndex = index;
    }

    updateToggle();
  });

  player.addEventListener("pause", updateToggle);
  player.addEventListener("timeupdate", updateProgress);
  player.addEventListener("loadedmetadata", updateProgress);

  player.addEventListener("ended", () => {
    const nextPlayer = players[index + 1];

    if (nextPlayer) {
      playTrack(index + 1);
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
