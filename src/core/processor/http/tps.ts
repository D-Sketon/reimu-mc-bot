import { command } from "../../../api/minecraft/server";

const tps = async () => {
  return await command("tps");
};

const guard = (msg: string) => {
  return msg === "tps";
};

export default {
  guard,
  processor: tps,
};
