import { config } from "../../config";
import type { Body } from "../../index";
import { ParameterizedContext, Next } from "koa";

export const whiteListFilter = () => {
  return async (ctx: ParameterizedContext, next: Next) => {
    const body = ctx.request.body as Body;
    if (config.whiteList) {
      if (config.whiteList.includes(body.sender.user_id)) {
        await next();
      }
    } else {
      await next();
    }
  };
};
