import { config } from "../../../../config";

const turnOffDeathLog = () => {
  config.deathLog = false;
  return "已关闭死亡log";
};

const guard = (msg: string) => {
  return msg === "关闭死亡";
};

export default {
  guard,
  processor: turnOffDeathLog,
};
