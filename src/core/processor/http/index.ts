import { onlinePlayer, onlinePlayers } from "./onlinePlayer";
import { serverStatus } from "./serverStatus";
import { gc } from "./gc";
import { tps } from "./tps";
import { help } from "./help";
import { turnOffDeathLog, turnOnDeathLog } from "./deathLog";

export default async (msg: string) => {
  if (msg === "服务器状态") {
    return serverStatus();
  } else if (msg === "在线玩家") {
    return onlinePlayers();
  } else if (msg.indexOf("查询玩家") > -1) {
    const name = msg.split(" ")[1];
    return onlinePlayer(name);
  } else if (msg === "gc") {
    return gc();
  } else if (msg === "tps") {
    return tps();
  } else if (msg === "帮助" || msg === "help") {
    return help();
  } else if (msg === "开启死亡") {
    return turnOnDeathLog();
  } else if (msg === "关闭死亡") {
    return turnOffDeathLog();
  } else {
    return "未知命令，有问题请问群主";
  }
};
