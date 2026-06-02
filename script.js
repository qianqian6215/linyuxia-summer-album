const players = Array.from(document.querySelectorAll("audio"));

players.forEach((player) => {
  player.addEventListener("play", () => {
    players.forEach((other) => {
      if (other !== player) {
        other.pause();
      }
    });
  });

  player.addEventListener("ended", () => {
    const nextPlayer = players[players.indexOf(player) + 1];

    if (nextPlayer) {
      nextPlayer.play().catch(() => {});
    }
  });
});
