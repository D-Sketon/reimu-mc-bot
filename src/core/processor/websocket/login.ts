import { Message } from "../../../api/minecraft/websocket";
import { timestamp } from "./timestamp";

export const login = (msg: Message) => {
  const loginReg =
    /(.*)\[(.*)\] logged in with entity id (.*) at \(\[(.*)\](.*), (.*)\, (.*)\)/;
  if (msg.msg.includes("logged in with entity id")) {
    const match = msg.msg.match(loginReg);
    if (!match) return;
    const playerName = match[1];
    const entityID = match[3];
    const world = match[4];
    const x = Number(match[5]).toFixed(2);
    const y = Number(match[6]).toFixed(2);
    const z = Number(match[7]).toFixed(2);
    return `${timestamp(
      msg
    )} ${playerName}(${entityID}) 登录到了 ${world} [${x}, ${y}, ${z}]`;
  }
};
