import { Message } from "../../../api/minecraft/websocket";
import { death } from "./death";
import { login } from "./login";
import { logout } from "./logout";

export default (msg: Message) => {
  if (Date.now() - msg.ts > 30000) {
    return;
  }
  let message: string | undefined;
  if ((message = login(msg))) {
    return message;
  }
  if ((message = logout(msg))) {
    return message;
  }
  if ((message = death(msg))) {
    return message;
  }
};
