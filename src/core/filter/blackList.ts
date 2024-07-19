import { config } from "../../config";
import type { Body } from "../../index";
import { ParameterizedContext, Next } from "koa";

export const blackListFilter = () => {
  return async (ctx: ParameterizedContext, next: Next) => {
    const body = ctx.request.body as Body;
    if (config.blackList && config.blackList.includes(body.sender.user_id)) {
      return;
    }
    await next();
  };
}