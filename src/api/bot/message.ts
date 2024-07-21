import axios from "axios";
import { config } from "../../config";

import pino from "pino";
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
});

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
