import { Message } from "../../../api/minecraft/websocket";
import { timestamp } from "./timestamp";
import { config } from "../../../config";

export const login = (msg: Message) => {
  const loginReg =
    /(.*)\[(.*)\] logged in with entity id (.*) at \(\[?([^\]]*)\]?(.*), (.*)\, (.*)\)/;
  if (msg.msg.includes("logged in with entity id")) {
    const match = msg.msg.match(loginReg);
    if (!match) return;
    const playerName = match[1];
    // const entityID = match[3];
    let world: string, x: string;
    if (match[5] === "") {
      world = "World";
      x = Number(match[4]).toFixed(1);
    } else {
      world = match[4];
      x = Number(match[5]).toFixed(1);
    }
    const y = Number(match[6]).toFixed(1);
    const z = Number(match[7]).toFixed(1);
    return `<${config.serverName}>${timestamp(
      msg
    )} ${playerName} 登录到了 ${world} [${x}, ${y}, ${z}]`;
  }
};
