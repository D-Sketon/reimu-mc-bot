import websocket from "websocket";
import { config } from "../../config";

export interface Message {
  msg: string;
  ts: number;
}

const { client: WebSocketClient } = websocket;
const client = new WebSocketClient();

client.on("connectFailed", (error) => {
  console.log("Connect Error: " + error.toString());
});

const messageQueue: Message[] = [];
let lockReconnect = false;

const wsUrl = `${config.serverTap.websocket}/ws/console`;

const reconnect = (callback?: (msgs: Message) => void) => {
  if (lockReconnect) return;
  lockReconnect = true;
  setTimeout(() => {
    initWebsocket(callback);
    lockReconnect = false;
  }, 2000);
};

const createHeartCheck = (connection: websocket.connection) => {
  let timeoutObj: ReturnType<typeof setTimeout> | null = null;
  let serverTimeoutObj: ReturnType<typeof setTimeout> | null = null;

  const reset = () => {
    if (timeoutObj) clearTimeout(timeoutObj);
    if (serverTimeoutObj) clearTimeout(serverTimeoutObj);
  };

  const start = () => {
    timeoutObj = setTimeout(() => {
      connection.send("ping");
      console.log("ping!");
      serverTimeoutObj = setTimeout(() => {
        connection.close();
      }, 60000);
    }, 60000);
  };

  return { reset, start };
};

export const initWebsocket = (callback?: (msgs: Message) => void) => {
  client.on("connect", function (connection) {
    console.log("WebSocket Client Connected");
    const heartCheck = createHeartCheck(connection);
    heartCheck.reset();
    heartCheck.start();
    connection.on("error", (error) => {
      console.log("Connection Error: " + error.toString());
      reconnect(callback);
    });
    connection.on("close", () => {
      console.log("echo-protocol Connection Closed");
      reconnect(callback);
    });
    connection.on("message", (message) => {
      heartCheck.reset();
      heartCheck.start();
      if (message.type === "utf8") {
        const msgObject: Message = JSON.parse(message.utf8Data);
        if (
          msgObject.msg === "Pong!" ||
          msgObject.msg.includes("/ping") ||
          msgObject.msg.includes("广告")
        ) {
          return;
        }
        const currentTimestamp = Date.now();
        while (
          messageQueue.length > 0 &&
          currentTimestamp - messageQueue[0].ts > 86400000 / 8
        ) {
          messageQueue.shift();
        }
        if (
          messageQueue.length &&
          msgObject.msg === messageQueue[messageQueue.length - 1].msg
        ) {
          messageQueue[messageQueue.length - 1] = msgObject;
        } else {
          messageQueue.push(msgObject);
        }
        callback && callback(msgObject);
      }
    });
  });
  client.connect(wsUrl, "echo-protocol");
};

export const getMessages = (length = 5) => {
  const currentTimestamp = Date.now();
  while (
    messageQueue.length > 0 &&
    currentTimestamp - messageQueue[0].ts > 86400000 / 8
  ) {
    messageQueue.shift();
  }
  return messageQueue.slice(-length);
};
