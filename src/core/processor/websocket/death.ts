import { Message } from "../../../api/minecraft/websocket";
import { config } from "../../../config";

export const death = (msg: Message) => {
  if (config.deathLog && msg.msg.includes("§7[§cDM§7] §r")) {
    const match = msg.msg.match(/§7\[§cDM§7\] §r(.*)/);
    if (match) return match[1];
  }
};
