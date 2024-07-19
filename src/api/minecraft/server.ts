import request from "./http";

interface Server {
  name: string;
  version: string;
  tps: number;
  health: {
    totalMemory: number;
    maxMemory: number;
    freeMemory: number;
  };
}

export const server = (): Promise<Server> =>
  request({
    method: "get",
    url: "/server",
  });

export const command = (command: string): Promise<string> =>
  request({
    method: "post",
    url: "/server/exec",
    data: {
      command,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    transformRequest: [
      function (data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      },
    ],
  });
