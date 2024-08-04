import { allPlayers } from "../../../../api/minecraft/player";

const onlinePlayers = async () => {
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

const guard = (msg: string) => {
  return msg === "在线玩家";
};

export default {
  guard,
  processor: onlinePlayers,
};
