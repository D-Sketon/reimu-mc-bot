import axios from "axios";
import { config } from "../../config";

export const sendMessage = (msg: string) => {
  try {
    axios.post(`${config.bot.http}/send_group_msg`, {
      group_id: config.groupId,
      message: msg,
    });
  } catch (e) {
    console.log(e);
  }
};
