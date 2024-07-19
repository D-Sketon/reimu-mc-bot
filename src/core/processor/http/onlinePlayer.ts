import { allPlayers, player } from "../../../api/minecraft/player";

export const onlinePlayers = async () => {
  let players = await allPlayers();
  if (players) {
    if (players.length === 0) {
      return "当前没有在线玩家";
    } else {
      const msgList: string[] = [];
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const res: string[] = [];
        res.push("玩家: " + player.displayName.replace("§r", ""));
        res.push("生命值: " + player.health.toFixed(2));
        res.push("饱和度: " + player.saturation.toFixed(2));
        res.push("饥饿度: " + player.hunger.toFixed(2));
        res.push(
          "坐标: " + player.location.map((i) => Math.round(i)).join(", ")
        );
        res.push("维度: " + player.dimension);
        msgList.push(res.join("\n"));
      }
      return msgList;
    }
  } else {
    return "当前没有在线玩家";
  }
};

export const onlinePlayer = async (name: string) => {
  const playerList = await allPlayers();
  const searchPlayer = playerList.find((player) => {
    return (
      player.displayName.replace("§r", "").toLowerCase() === name.toLowerCase()
    );
  });
  if (searchPlayer) {
    const thisPlayer = await player(searchPlayer.uuid);
    const res: string[] = [];
    res.push("玩家: " + thisPlayer.displayName.replace("§r", ""));
    res.push("生命值: " + thisPlayer.health.toFixed(2));
    res.push("饱和度: " + thisPlayer.saturation.toFixed(2));
    res.push("饥饿度: " + thisPlayer.hunger.toFixed(2));
    res.push(
      "坐标: " + thisPlayer.location.map((i) => Math.round(i)).join(", ")
    );
    res.push("维度: " + thisPlayer.dimension);
    return res.join("\n");
  } else {
    return "该玩家不存在或未上线";
  }
};
