import { command } from "../../../api/minecraft/server";

const gc = async () => {
  return await command("gc");
};

const guard = (msg: string) => {
  return msg === "gc";
};

export default {
  guard,
  processor: gc,
};
