import { config } from "../../../../config";

const turnOnDeathLog = () => {
  config.deathLog = true;
  return "已开启死亡log";
};

const guard = (msg: string) => {
  return msg === "开启死亡";
};

export default {
  guard,
  processor: turnOnDeathLog,
};
