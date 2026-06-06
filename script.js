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
    title: "寄给夏天",
    note: "出发前一晚，行李箱摊在地板上，群聊还在跳，窗外的蝉鸣把夏夜拉得很长。",
    cover: "./assets/images/summer-postcard.jpg",
    lyrics: [
      { time: 9.533, text: "行李箱摊在地板上" },
      { time: 14.9, text: "月亮还剩半个光" },
      { time: 20.2, text: "群聊里有人说别迟到" },
      { time: 23.2, text: "又发来一张笑的表情包" },
      { time: 25.766, text: "耶" },
      { time: 30.866, text: "窗外的蝉鸣都很长" },
      { time: 33.533, text: "风吹动没关好的窗" },
      { time: 36.266, text: "我把拖鞋塞进行囊" },
      { time: 38.9, text: "想把明天偷偷放在手上" },
      { time: 41.466, text: "我们都没有讲" },
      { time: 46.466, text: "这趟路有多不一样" },
      { time: 52.466, text: "只说海边见吧" },
      { time: 55.666, text: "把晚安说得很平常" },
      { time: 62.9, text: "我要把这夜寄往夏天" },
      { time: 65.933, text: "寄给还没出发的海岸线" },
      { time: 68.7, text: "寄给车窗外摇晃的蓝" },
      { time: 71.266, text: "寄给你们吵闹的明天" },
      { time: 73.6, text: "如果风刚好经过身边" },
      { time: 76.3, text: "替我把舍不得说清一点" },
      { time: 79.3, text: "别问后来会不会走远" },
      { time: 81.933, text: "先把夏天绕一遍" },
      { time: 84.266, text: "便利贴写着牙刷和伞" },
      { time: 87.3, text: "还有谁负责带充电线" },
      { time: 94.9, text: "地图被我们圈了一圈" },
      { time: 97.766, text: "像某种幼稚又认真的冒险" },
      { time: 100.6, text: "冰箱里最后一只冰棒" },
      { time: 103.3, text: "被谁嚼着封成两半" },
      { time: 105.6, text: "楼下路灯亮到很晚" },
      { time: 108.566, text: "楼下路灯亮到很晚" },
      { time: 110.933, text: "照着我们还没睡的勇敢" },
      { time: 116.266, text: "也许很多年以后" },
      { time: 118.9, text: "我们会忘了那天出发" },
      { time: 121.566, text: "但会记得有人别等啦" },
      { time: 126.866, text: "我要把这夜寄往夏天" },
      { time: 129.933, text: "寄给那条发烫的海岸线" },
      { time: 132.6, text: "寄给没有写完的从前" },
      { time: 135.366, text: "寄给我们没说破的再见" },
      { time: 137.966, text: "如果风刚好还经过身边" },
      { time: 140.5, text: "就让它停在照片印背面" },
      { time: 143.3, text: "等到某天" },
      { time: 144.333, text: "忽然想念 再拆开这个夏天" },
      { time: 153.533, text: "嗯嗯" },
      { time: 157.866, text: "再拆开这个夏天，夏夜蝉鸣" },
    ],
  },
  {
    title: "沿着海风出发",
    note: "白天终于展开，车窗开了一半。朋友们不急着赶往远方，只想把夏天放慢。",
    cover: "./assets/images/along-sea-wind.jpg",
    lyrics: [
      { time: 14.166, text: "车窗开了一半" },
      { time: 17.4, text: "风吹过白衬衫" },
      { time: 20.733, text: "地图折在手上" },
      { time: 22.466, text: "海边还在前方" },
      { time: 25.8, text: "你说别急着想" },
      { time: 28.366, text: "明天会怎样" },
      { time: 30.533, text: "先把云看完再慢慢长大" },
      { time: 36.4, text: "沿着海风出发 沿着晴天转弯" },
      { time: 39.733, text: "我们没有赶往远方 只是把夏天放慢" },
      { time: 43.933, text: "沿着海风出发" },
      { time: 46.366, text: "沿着浪花靠岸" },
      { time: 48.1, text: "如果多年后想起今天" },
      { time: 50.133, text: "愿你还记得这片蓝" },
      { time: 56.133, text: "便利店的冰块" },
      { time: 57.5, text: "融化得很缓慢" },
      { time: 59.2, text: "你把快乐递来 分我小小一半" },
      { time: 62.666, text: "虫鸣落在耳边" },
      { time: 64.1, text: "谁都没有多言" },
      { time: 65.566, text: "那些小小心愿 被风吹得很远" },
      { time: 69.766, text: "沿着海风出发 沿着晴天转弯" },
      { time: 73.066, text: "我们没有赶往远方 只是把夏天放慢" },
      { time: 77.266, text: "沿着海风出发" },
      { time: 79.733, text: "沿着浪花靠岸" },
      { time: 81.4, text: "如果多年后想起今天" },
      { time: 83.5, text: "愿你还记得这片蓝" },
      { time: 88.1, text: "沿着海风出发" },
      { time: 91.166, text: "海浪慢慢回答" },
      { time: 94.566, text: "那年我们都在 夏天没有走远" },
    ],
  },
  {
    title: "蓝色路牌",
    note: "沿海公路真正打开。那块蓝色路牌一闪而过，像青春在后视镜里发亮。",
    cover: "./assets/images/blue-road-sign.jpg",
    lyrics: [
      { time: 11.133, text: "有人迟到也笑得自然" },
      { time: 14.966, text: "随手塞进的薯片两三罐" },
      { time: 19, text: "脑袋里没有设置终点站" },
      { time: 23, text: "青春的电量总是用不完" },
      { time: 27.333, text: "窗外的风忽然吹过耳边" },
      { time: 31.066, text: "后座的 CD 转了几圈" },
      { time: 35.466, text: "我们大声唱着跑调的歌" },
      { time: 38.866, text: "想要把平凡日子都甩掉" },
      { time: 43.333, text: "沿着蓝色路牌开往海边" },
      { time: 46.966, text: "把城市甩在后视镜里面" },
      { time: 50.966, text: "让海风吹过耳边碎碎念" },
      { time: 54.966, text: "把未来说得轻一点" },
      { time: 59.133, text: "把光阴刻成永远的起点" },
      { time: 63, text: "和昨天好好地告别" },
      { time: 67.2, text: "拍下路边一整排的椰子树" },
      { time: 71.3, text: "还有你裙摆上跳舞的光束" },
      { time: 75.2, text: "冰淇淋融化在 32 度" },
      { time: 78.733, text: "关于远方我们谁都没有认输" },
      { time: 83.2, text: "收音机播着不知名的歌" },
      { time: 86.966, text: "像一段老电影里的定格" },
      { time: 91.1, text: "你问我到底在看些什么" },
      { time: 94.7, text: "我说今天的云朵特别想你" },
      { time: 99.466, text: "看见蓝色路牌开往海边" },
      { time: 103, text: "把城市甩在后视镜里面" },
      { time: 107, text: "让海风吹过耳边碎碎念" },
      { time: 111, text: "把未来说得轻一点" },
      { time: 114.966, text: "把光阴刻成永远的起点" },
      { time: 118.966, text: "和昨天好好地告别" },
      { time: 123.133, text: "忽然安静了几秒钟" },
      { time: 127.166, text: "只有风在车里穿行" },
      { time: 131.2, text: "然后谁又开了玩笑" },
      { time: 134.8, text: "把沉默吹散在风中" },
      { time: 139.2, text: "看见蓝色路牌开往海边" },
      { time: 143, text: "把未来说成永远的起点" },
      { time: 147, text: "和昨天好好地告别" },
      { time: 151.166, text: "再见了夏天" },
    ],
  },
  {
    title: "便利店晚风",
    note: "沿海路边短暂停靠，冰淇淋快化了，汽水罐冒着水珠，日落还在等下一站。",
    cover: "./assets/images/convenience-breeze.jpg",
    lyrics: [
      { time: 0.3, text: "嗯" },
      { time: 4.066, text: "嗯嗯嗯" },
      { time: 7.733, text: "车停在能看见海的路边" },
      { time: 11.1, text: "后座堆着拖鞋和照片" },
      { time: 14.133, text: "自动门叮咚一声打开" },
      { time: 17.933, text: "冷气把太阳推远一点" },
      { time: 22.366, text: "你说冰淇淋快要化了" },
      { time: 25.4, text: "我说地图也看花了眼" },
      { time: 30.366, text: "导航重新规划路线" },
      { time: 32.9, text: "我们却先笑成一团" },
      { time: 37.133, text: "窗外的柏油路还发烫" },
      { time: 40.9, text: "远处的浪慢慢发亮" },
      { time: 44.866, text: "谁也不急着问下一站" },
      { time: 48.366, text: "反正风会替我们转弯" },
      { time: 52.933, text: "便利店晚风吹过来" },
      { time: 56.133, text: "吹过汽水罐上的水珠" },
      { time: 59.9, text: "吹过我们晒红的侧脸" },
      { time: 63.566, text: "吹过没说出口的再见" },
      { time: 66.766, text: "便利店晚风吹过来" },
      { time: 71.566, text: "吹得下午慢了半拍" },
      { time: 74.933, text: "如果夏天只能停一站" },
      { time: 78.6, text: "那就再坐一会儿再离开" },
      { time: 82.366, text: "哈 嗯嗯嗯" },
      { time: 89.6, text: "你买错我想吃的口味" },
      { time: 93.4, text: "还说这样比较像冒险" },
      { time: 97.133, text: "朋友在门口唱跑调的歌" },
      { time: 100.5, text: "把路人都唱得回头看" },
      { time: 105.333, text: "海边只隔着一条街" },
      { time: 107.9, text: "鞋子还没干就想去踩水" },
      { time: 112.866, text: "日落在云后面催我们快一点" },
      { time: 116.466, text: "又不用真的快一点" },
      { time: 119.766, text: "我们把地图折成纸船" },
      { time: 123.366, text: "假装它能飘到明天" },
      { time: 127.133, text: "谁也不提之后多远" },
      { time: 130.9, text: "只说等下去追海岸线" },
      { time: 134.933, text: "便利店晚风吹过来" },
      { time: 138.666, text: "吹过汽水罐上的水珠" },
      { time: 141.8, text: "吹过我们晒红的侧脸" },
      { time: 145.266, text: "吹过没说出口的再见" },
      { time: 149.266, text: "便利店晚风吹过来" },
      { time: 154.066, text: "吹得下午慢了半拍" },
      { time: 157.4, text: "如果夏天只能停一站" },
      { time: 161, text: "那就再坐一会儿再离开" },
      { time: 164.6, text: "天边的晚霞红了又淡" },
      { time: 168.366, text: "像那年一起看过的烟火" },
      { time: 171.466, text: "有些话还没讲完" },
      { time: 175.9, text: "就让它留在风里飘散" },
      { time: 179.766, text: "啊啊啊" },
      { time: 182.166, text: "便利店晚风吹过来" },
      { time: 185.566, text: "吹过汽水罐上的水珠" },
      { time: 189.333, text: "吹过我们晒红的侧脸" },
      { time: 193.566, text: "吹过没说出口的再见" },
      { time: 198.133, text: "晚风吹过来吹过来" },
      { time: 200.966, text: "吹得下午慢了半拍" },
      { time: 204.3, text: "如果夏天只能停一站" },
      { time: 208, text: "那就再坐一会儿再离开" },
    ],
  },
  {
    title: "日落未送达",
    note: "有些话停在输入框里，像风绕过指尖。日落终于到了海边，人却没有认真告别。",
    cover: "./assets/images/sunset-undelivered.jpg",
    lyrics: [
      { time: 0.2, text: "午夜的钟声回荡在空巷" },
      { time: 7.5, text: "街角咖啡店还亮着微光" },
      { time: 15.3, text: "你留下的信纸泛黄" },
      { time: 19.066, text: "字里行间藏着过往" },
      { time: 24.1, text: "那年海风吹拂着发梢" },
      { time: 31.8, text: "你说未来我们一起闯" },
      { time: 37.4, text: "如今只剩我一人远眺" },
      { time: 41.2, text: "回忆在心底摇晃" },
      { time: 45.333, text: "如果时间能倒退一秒" },
      { time: 49.1, text: "回到初见的那个岛" },
      { time: 52.7, text: "我一定紧紧把你拥抱" },
      { time: 56.3, text: "不让爱变成煎熬" },
      { time: 67.1, text: "嗯嗯嗯" },
      { time: 90.1, text: "人潮汹涌我寻你不到" },
      { time: 97.5, text: "城市霓虹也模糊了心跳" },
      { time: 103.966, text: "故事结局我无从预料" },
      { time: 107.6, text: "只剩思念无处可逃" },
      { time: 111.8, text: "如果时间能倒退一秒" },
      { time: 115.533, text: "回到初见的那个岛" },
      { time: 119.133, text: "我一定紧紧把你拥抱" },
      { time: 122.733, text: "不让爱变成借口" },
      { time: 133.566, text: "嗯啊" },
      { time: 137.166, text: "啊啊" },
      { time: 141.966, text: "哈哈哈哈哈哈哈" },
    ],
  },
  {
    title: "海风明信片",
    note: "最后一张明信片不写地址，也不写期限。等风吹过窗前，请记得那年夏天。",
    cover: "./assets/images/sea-breeze-postcard.jpg",
    lyrics: [
      { time: 1.133, text: "啊啊" },
      { time: 15.933, text: "我们坐在最后一片海边" },
      { time: 19.766, text: "鞋子还沾着下午的盐" },
      { time: 23.766, text: "蓝色路牌在身后很远" },
      { time: 27.466, text: "像一句没写完的再见" },
      { time: 31.166, text: "便利店的冰块早就化了" },
      { time: 35.266, text: "日落也安静地退潮了" },
      { time: 39.566, text: "你把相机放在膝盖上" },
      { time: 42.9, text: "说照片要晚一点再传" },
      { time: 47.6, text: "没有人提起明天" },
      { time: 51.5, text: "也没有人问起点" },
      { time: 54.9, text: "只是听着浪一遍一遍" },
      { time: 58.333, text: "把话说得很浅" },
      { time: 62.866, text: "我把海风写进明信片" },
      { time: 66.066, text: "寄给那个还没走远的夏天" },
      { time: 70, text: "寄给车窗外笑过的脸" },
      { time: 72.933, text: "寄给我们绕过的一整圈" },
      { time: 79.1, text: "如果以后很少再见" },
      { time: 82.966, text: "别把今天说成从前" },
      { time: 87.2, text: "等风吹过某个晴天" },
      { time: 89.666, text: "你会听见我们还在海边" },
      { time: 98.133, text: "Wu Wu Wu" },
      { time: 102.066, text: "Wu" },
      { time: 110.133, text: "橘猫趴在白色矮墙边" },
      { time: 113.966, text: "尾巴轻轻扫过拖鞋" },
      { time: 117.866, text: "你说它好像也在等" },
      { time: 121.666, text: "等我们把故事讲完一些" },
      { time: 125.566, text: "有人把最后一口汽水" },
      { time: 129.733, text: "分给了不说话的夜" },
      { time: 133.533, text: "我们笑着说该回去了" },
      { time: 137.333, text: "却谁都没有先站起来" },
      { time: 142, text: "海浪替我们停顿" },
      { time: 145.933, text: "晚风替我们承认" },
      { time: 149.333, text: "有些舍不得不必出声" },
      { time: 152.566, text: "也会留在心里很深" },
      { time: 157.133, text: "我把海风写进明信片" },
      { time: 160.466, text: "寄给那个还没走远的夏天" },
      { time: 164.4, text: "寄给车窗外笑过的脸" },
      { time: 168.366, text: "寄给我们绕过的一整圈" },
      { time: 173.4, text: "如果以后很少再见" },
      { time: 177.366, text: "别把今天说成从前" },
      { time: 181.666, text: "等风吹过某个晴天" },
      { time: 184.133, text: "你会听见" },
      { time: 185.366, text: "我们还在海边" },
      { time: 189.9, text: "很多年以后也许会忘了路线" },
      { time: 193.466, text: "忘了那家店的冰淇淋" },
      { time: 195.466, text: "忘了那天几点天黑" },
      { time: 197.466, text: "可只要有人说起夏天" },
      { time: 199.6, text: "我就会想起这一瞬间" },
      { time: 201.6, text: "我们什么都没说" },
      { time: 203.366, text: "却好像什么都说了" },
      { time: 208.266, text: "我把海风写进明信片" },
      { time: 212.266, text: "不写地址也不写期限" },
      { time: 215.533, text: "寄给每个想回去的夜" },
      { time: 218.533, text: "寄给还在发亮的少年" },
      { time: 224.566, text: "如果以后各自走远" },
      { time: 228.466, text: "就让风替我们见面" },
      { time: 232.8, text: "等它吹过你的窗前" },
      { time: 234.366, text: "请记得那年夏天" },
      { time: 255.466, text: "我们没有认真告别" },
      { time: 259.066, text: "只是坐到海风慢慢变远" },
      { time: 264.7, text: "hmm" },
      { time: 278.366, text: "I'm better loving you" },
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

    const activeLine = lines[activeLyricIndex];

    if (activeLine) {
      activeLine.scrollIntoView({ block: "center", behavior: "smooth" });
    }
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
