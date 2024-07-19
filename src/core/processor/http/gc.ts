import { command } from "../../../api/minecraft/server";

export const gc = async () => {
  return await command("gc");
};
