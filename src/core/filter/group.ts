import type { Body } from "../../index";
import { config } from "../../config";
import { ParameterizedContext, Next } from "koa";

export const groupFilter = () => {
  return async (ctx: ParameterizedContext, next: Next) => {
    const body = ctx.request.body as Body;
    if (body.group_id == config.groupId && body.message_type === "group") {
      if (
        body.message.length === 2 &&
        body.message[0].type === "at" &&
        body.message[0].data.qq == config.botId
      ) {
        await next();
      }
    }
  };
};
