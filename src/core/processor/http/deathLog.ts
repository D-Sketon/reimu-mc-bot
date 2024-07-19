import { config } from "../../../config";

export const turnOnDeathLog = () => {
  config.deathLog = true;
  return "已开启死亡log";
};

export const turnOffDeathLog = () => {
  config.deathLog = false;
  return "已关闭死亡log";
};
