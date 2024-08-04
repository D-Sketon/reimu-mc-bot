import onlinePlayer from "./onlinePlayer/onlinePlayer";
import onlinePlayers from "./onlinePlayer/onlinePlayers";
import serverStatus from "./serverStatus";
import gc from "./gc";
import tps from "./tps";
import help from "./help";
import turnOnDeathLog from "./deathLog/turnOnDeathLog";
import turnOffDeathLog from "./deathLog/turnOffDeathLog";

const processors: {
  guard: (msg: string) => boolean;
  processor: (
    ...args: string[]
  ) => Promise<string | string[]> | string | string[];
}[] = [
  onlinePlayer,
  onlinePlayers,
  serverStatus,
  gc,
  tps,
  help,
  turnOnDeathLog,
  turnOffDeathLog,
];

export default async (msg: string) => {
  for (const processor of processors) {
    if (processor.guard(msg)) {
      return await processor.processor(msg);
    }
  }
  return "未知命令，有问题请问群主";
};
