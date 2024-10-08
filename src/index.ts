import koa from "koa";
import bodyParser from "koa-bodyparser";

import { initWebsocket } from "./api/minecraft/websocket";

import { config } from "./config";
import { sendMessage, sendMessageImg } from "./api/bot/message";
import websocketProcessor from "./core/processor/websocket";
import httpProcessor from "./core/processor/http";

import { whiteListFilter } from "./core/filter/whiteList";
import { blackListFilter } from "./core/filter/blackList";
import { groupFilter } from "./core/filter/group";

import logger from "./utils/logger";

export interface Body {
  group_id: number;
  user_id: number;
  sender: {
    user_id: number;
    nickname: string;
  };
  message_type: string;
  message: {
    type: string;
    data: any;
  }[];
}

const app = new koa();
app.use(bodyParser());

app.use(whiteListFilter());
app.use(blackListFilter());
app.use(groupFilter());
app.use(async (ctx) => {
  const body = ctx.request.body as Body;
  const msg = body.message[1].data.text.trim();
  const message = await httpProcessor(msg);
  if (Array.isArray(message)) {
    message.forEach((m) => {
      sendMessage(m);
      logger.info(m);
    });
  } else if (typeof message === "string") {
    sendMessage(message);
    logger.info(message);
  } else if (message instanceof Buffer) {
    const base64 = "base64://" + message.toString("base64");
    sendMessageImg(msg, base64);
    logger.info(base64);
  }
});

app.listen(config.server.port, () => {
  logger.info(`Server is running on port ${config.server.port}`);
});

initWebsocket((msg) => {
  try {
    let message: string | undefined;
    if ((message = websocketProcessor(msg))) {
      sendMessage(message);
      logger.info(message);
    }
  } catch (e) {}
});
