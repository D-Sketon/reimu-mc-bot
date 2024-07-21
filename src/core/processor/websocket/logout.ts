import { Message } from "../../../api/minecraft/websocket";
import { timestamp } from "./timestamp";
import { config } from "../../../config";

export const logout = (msg: Message) => {
  const logoutReg = /(.*) lost connection: (.*)/;
  if (msg.msg.includes("lost connection: ")) {
    const match = msg.msg.match(logoutReg);
    if (!match) return;
    const playerName = match[1];
    // const reason = match[2];
    return `<${config.serverName}>${timestamp(msg)} ${playerName} 退出了游戏`;
  }
};
