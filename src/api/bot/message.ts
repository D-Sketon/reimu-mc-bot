import axios from "axios";
import { config } from "../../config";
import logger from "../../utils/logger";

export const sendMessage = (msg: string) => {
  try {
    axios.post(`${config.bot.http}/send_group_msg`, {
      group_id: config.groupId,
      message: msg,
    });
  } catch (e) {
    logger.error(e);
  }
};

export const sendMessageImg = (msg: string, base64: string) => {
  try {
    axios.post(`${config.bot.http}/send_group_msg`, {
      group_id: config.groupId,
      message: {
        type: "image",
        data: {
          file: base64,
        },
      },
    });
  } catch (e) {
    logger.error(e);
  }
};
