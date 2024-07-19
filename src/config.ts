import jsYaml from "js-yaml";
import fs from "fs";

interface Config {
  serverTap: {
    http: string;
    websocket: string;
  };
  bot: {
    http: string;
    websocket: string;
  }
  groupId: number;
  botId: number;
  blackList?: number[];
  whiteList?: number[];
  server: {
    port: number;
  },
  deathLog: boolean;
}

export const config = jsYaml.load(
  fs.readFileSync("config.yml", "utf8")
) as Config;