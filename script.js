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
      { time: 30, text: "窗外的蝉叫得很长" },
      { time: 33, text: "风吹动没关好的窗" },
      { time: 36, text: "我把拖鞋塞进行囊" },
      { time: 39, text: "想把明天偷偷放在手上" },
      { time: 41, text: "我们都没有讲" },
      { time: 46, text: "这趟路有多不一样" },
      { time: 50, text: "只说海边见吧" },
      { time: 56, text: "把晚安说得很平常" },
      { time: 60, text: "我要把这夜寄往夏天" },
      { time: 66, text: "寄给还没出发的海岸线" },
      { time: 68, text: "寄给车窗外摇晃的蓝" },
      { time: 71, text: "寄给你们吵闹的明天" },
      { time: 73, text: "如果风刚好经过身边" },
      { time: 76, text: "替我把舍不得说轻一点" },
      { time: 79, text: "别问后来会不会走远" },
      { time: 82, text: "先把夏天绕一遍" },
      { time: 84, text: "便利贴写着牙刷和伞" },
      { time: 87, text: "还有谁负责带充电线" },
      { time: 95, text: "地图被我们圈了一圈" },
      { time: 100, text: "冰箱里最后一支冰棒" },
      { time: 105, text: "楼下路灯亮到很晚" },
      { time: 111, text: "照着我们还没睡的勇敢" },
      { time: 116, text: "也许很多年以后" },
      { time: 119, text: "我们会忘了那天出发" },
      { time: 122, text: "但会记得有人说别等了" },
      { time: 127, text: "我要把这夜寄往夏天" },
      { time: 130, text: "寄给那条发烫的海岸线" },
      { time: 132, text: "寄给没有写完的从前" },
      { time: 135, text: "寄给我们没说破的再见" },
      { time: 138, text: "如果风刚好还经过身边" },
      { time: 140, text: "就让它停在照片背面" },
      { time: 143, text: "等到某天忽然想念" },
      { time: 146, text: "再拆开这个夏天" },
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
      { time: 27, text: "窗外的风忽然切过耳边" },
      { time: 31, text: "后座的 CD 转了几圈" },
      { time: 36, text: "我们大声唱着跑调的歌" },
      { time: 39, text: "想要把平凡日子都瓦解" },
      { time: 43, text: "沿着蓝色路牌开往海边" },
      { time: 47, text: "把城市甩在后视镜里面" },
      { time: 51, text: "让海风吹过耳边碎碎念" },
      { time: 55, text: "把未来说得轻一点" },
      { time: 59, text: "把光阴刻进永远的起点" },
      { time: 63, text: "和昨天好好地告别" },
      { time: 67, text: "拍下路边一整排的椰子树" },
      { time: 71, text: "还有你裙摆上跳舞的光束" },
      { time: 75, text: "冰淇淋融化在三十二度" },
      { time: 79, text: "关于远方我们谁都没有认输" },
      { time: 83, text: "收音机播着不知名的歌" },
      { time: 87, text: "像一段老电影里的定格" },
      { time: 91, text: "你问我到底在看些什么" },
      { time: 95, text: "我说今天的云朵特别像你" },
      { time: 99, text: "沿着蓝色路牌开往海边" },
      { time: 103, text: "把城市甩在后视镜里面" },
      { time: 107, text: "让海风吹过耳边碎碎念" },
      { time: 111, text: "把未来说得轻一点" },
      { time: 115, text: "把光阴刻进永远的起点" },
      { time: 119, text: "和昨天好好地告别" },
      { time: 123, text: "忽然安静了几秒钟" },
      { time: 127, text: "只有风在车里穿行" },
      { time: 131, text: "然后谁又开了玩笑" },
      { time: 135, text: "把沉默吹散在风中" },
      { time: 139, text: "沿着蓝色路牌开往海边" },
      { time: 143, text: "把未来说成永远的起点" },
      { time: 147, text: "和昨天好好地告别" },
      { time: 151, text: "再见了，夏天" },
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
      { time: 30, text: "当重新规划路线" },
      { time: 33, text: "我们却先笑成一团" },
      { time: 37, text: "窗外的柏油路还发烫" },
      { time: 41, text: "远处的浪慢慢发亮" },
      { time: 45, text: "谁也不急着问下一站" },
      { time: 48, text: "反正风会替我们转弯" },
      { time: 53, text: "便利店晚风吹过来" },
      { time: 56, text: "吹过汽水罐上的水白" },
      { time: 60, text: "吹过我们晒红的侧脸" },
      { time: 63, text: "吹过没说出口的再见" },
      { time: 68, text: "便利店晚风吹过来" },
      { time: 71, text: "吹得下午慢了半拍" },
      { time: 75, text: "如果夏天只能停一站" },
      { time: 78, text: "那就再坐一会儿再离开" },
      { time: 82, text: "你买错我想吃的口味" },
      { time: 93, text: "还说这样比较像冒险" },
      { time: 96, text: "朋友在门口唱跑调的歌" },
      { time: 100, text: "把路人都唱得回头看" },
      { time: 112, text: "日落在云后面催我们快一点" },
      { time: 116, text: "又不用真的快一点" },
      { time: 119, text: "我们把地图折成纸船" },
      { time: 123, text: "假装它能漂到明天" },
      { time: 126, text: "谁也不提之后多远" },
      { time: 130, text: "只说等下去追海岸线" },
      { time: 135, text: "便利店晚风吹过来" },
      { time: 138, text: "吹过汽水罐上的水白" },
      { time: 142, text: "吹过我们晒红的侧脸" },
      { time: 146, text: "吹过没说出口的再见" },
      { time: 150, text: "便利店晚风吹过来" },
      { time: 154, text: "吹得下午慢了半拍" },
      { time: 157, text: "如果夏天只能停一站" },
      { time: 161, text: "那就再坐一会儿再离开" },
      { time: 168, text: "晚霞红了又暗" },
      { time: 172, text: "像那年一起看过的烟火" },
      { time: 176, text: "有些话还没想完" },
      { time: 182, text: "就让它留在风里飘散" },
      { time: 186, text: "便利店晚风吹过来" },
      { time: 199, text: "一天一天晚风吹过来" },
      { time: 208, text: "那就再坐一会儿再离开" },
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
      { time: 24, text: "那年海风吹拂着发梢" },
      { time: 31, text: "你说未来我们一起闯" },
      { time: 38, text: "如今只剩我一人远眺" },
      { time: 41, text: "回忆在心底摇晃" },
      { time: 45, text: "如果时间能倒退一秒" },
      { time: 49, text: "回到初见的那个岛" },
      { time: 53, text: "我一定轻轻把你拥抱" },
      { time: 56, text: "不让爱变成煎熬" },
      { time: 90, text: "人潮汹涌我寻你不到" },
      { time: 97, text: "城市霓虹也模糊了心跳" },
      { time: 104, text: "故事结局我无从预料" },
      { time: 107, text: "只剩思念无处可逃" },
      { time: 112, text: "如果时间能倒退一秒" },
      { time: 115, text: "回到初见的那个岛" },
      { time: 119, text: "我一定静静把你拥抱" },
      { time: 123, text: "不让爱变成煎熬" },
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
      { time: 31, text: "便利店的冰块早就化了" },
      { time: 35, text: "日落也安静地退潮了" },
      { time: 39, text: "你把相机放在膝盖上" },
      { time: 43, text: "说照片要晚一点再传" },
      { time: 47, text: "没有人提起明天" },
      { time: 51, text: "也没有人问几点" },
      { time: 55, text: "只是听着浪一遍一遍" },
      { time: 58, text: "把话说得很浅" },
      { time: 63, text: "我把海风写进明信片" },
      { time: 66, text: "寄给那个还没走远的夏天" },
      { time: 70, text: "寄给车窗外笑过的脸" },
      { time: 73, text: "寄给我们绕过的一整圈" },
      { time: 79, text: "如果以后很少再见" },
      { time: 83, text: "别把今天说成从前" },
      { time: 87, text: "等风吹过某个晴天" },
      { time: 90, text: "你会听见我们还在海边" },
      { time: 109, text: "橘猫趴在白色栏杆边" },
      { time: 113, text: "阿橘轻轻扫过拖鞋" },
      { time: 117, text: "你说它好像也在等" },
      { time: 121, text: "等我们把故事讲完一些" },
      { time: 125, text: "有人把最后一口汽水" },
      { time: 129, text: "分给了不说话的夜" },
      { time: 133, text: "我们笑着说该回去了" },
      { time: 137, text: "却谁都没有先站起来" },
      { time: 142, text: "海浪替我们停顿" },
      { time: 146, text: "晚风替我们承认" },
      { time: 149, text: "有些舍不得不必出声" },
      { time: 153, text: "也会留在心里很深" },
      { time: 157, text: "我把海风写进明信片" },
      { time: 160, text: "寄给那个还没走远的夏天" },
      { time: 164, text: "寄给车窗外笑过的脸" },
      { time: 167, text: "寄给我们绕过的一整圈" },
      { time: 173, text: "如果以后很少再见" },
      { time: 177, text: "别把今天说成从前" },
      { time: 181, text: "等风吹过某个晴天" },
      { time: 184, text: "你会听见我们还在海边" },
      { time: 189, text: "很多年以后" },
      { time: 191, text: "也许会忘了路线" },
      { time: 193, text: "忘了那夏天的冰淇淋" },
      { time: 195, text: "忘了那天几点天黑" },
      { time: 197, text: "可只要有人说起夏天" },
      { time: 199, text: "我就会想起这一瞬间" },
      { time: 201, text: "我们什么都没说" },
      { time: 203, text: "却好像什么都说了" },
      { time: 208, text: "我把海风写进明信片" },
      { time: 212, text: "不写地址也不写期限" },
      { time: 215, text: "寄给每个想回去的夜" },
      { time: 218, text: "寄给还在发亮的少年" },
      { time: 223, text: "如果以后各自走远" },
      { time: 227, text: "就让风替我们见面" },
      { time: 231, text: "等它吹过你的窗前" },
      { time: 235, text: "请记得那年夏天" },
      { time: 253, text: "我们没有认真告别" },
      { time: 259, text: "只是坐到海风慢慢变远" },
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
