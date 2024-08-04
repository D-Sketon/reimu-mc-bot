import { Message } from "../../../api/minecraft/websocket";
import { death } from "./death";
import { login } from "./login";
import { logout } from "./logout";

const processors: ((msg: Message) => string | undefined)[] = [
  login,
  logout,
  death,
];

export default (msg: Message) => {
  if (Date.now() - msg.ts > 30000) {
    return;
  }
  let message: string | undefined;
  for (const processor of processors) {
    if ((message = processor(msg))) {
      return message;
    }
  }
};
