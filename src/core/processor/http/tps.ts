import { command } from "../../../api/minecraft/server";

export const tps = async () => {
  return await command("tps");
};
