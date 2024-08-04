import { allPlayers, player } from "../../../../api/minecraft/player";

const onlinePlayer = async (msg: string) => {
  const name = msg.split(" ")[1];
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

const guard = (msg: string) => {
  return msg.startsWith("玩家");
};

export default {
  guard,
  processor: onlinePlayer,
};
