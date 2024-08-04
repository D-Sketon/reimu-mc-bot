import { allPlayers } from "../../../api/minecraft/player";
import { server } from "../../../api/minecraft/server";

const serverStatus = async () => {
  const data = await server();
  const res: string[] = [];
  res.push("名称: " + data.name);
  res.push("版本: " + data.version);
  res.push("TPS: " + data.tps);
  res.push(
    "分配内存: " + Math.round(data.health.totalMemory / 1024 / 1024) + "MB"
  );
  res.push("总内存: " + Math.round(data.health.maxMemory / 1024 / 1024) + "MB");
  res.push(
    "空闲内存: " + Math.round(data.health.freeMemory / 1024 / 1024) + "MB"
  );

  const players = await allPlayers();
  res.push("在线玩家数量: " + (players ? players.length : 0));
  return res.join("\n");
};

const guard = (msg: string) => {
  return msg === "服务器状态";
};

export default {
  guard,
  processor: serverStatus,
};
