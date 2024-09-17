import { memory } from "megumu";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { config } from "../../../config";
import logger from "../../../utils/logger";
import { sendMessage } from "../../../api/bot/message";

const width = 800; //px
const height = 400; //px
const backgroundColour = "white";
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour,
});

const addMonitor = () => {
  const remove = memory.addEventListener(
    {
      type: memoryConfig.type as "LE" | "GE",
      target: memoryConfig.target as "OS",
      value: memoryConfig.value,
      duration: memoryConfig.duration,
    },
    (data) => {
      sendMessage(
        `当前内存使用 ${parseInt(
          ((data.total - data.free) / 1024 / 1024) as any
        )} MB！请注意崩溃风险！`
      );
      remove();
      // 防止刷屏，延迟两分钟再次添加
      setTimeout(() => {
        addMonitor();
      }, 120000);
      logger.warn(
        `Memory ${memoryConfig.type} ${memoryConfig.value} for ${memoryConfig.duration}ms`
      );
    },
    memoryConfig.interval
  );
};

const { memory: memoryConfig } = config.monitor;
const memoryQueue: {
  total: number;
  free: number;
  timestamp: number;
}[] = [];
if (memoryConfig.enable) {
  // default tick
  memory.addEventListener(
    {
      type: "TICK",
      target: "OS",
    },
    (data) => {
      if (memoryQueue.length >= 120) {
        memoryQueue.shift();
      }
      memoryQueue.push({
        total: data.total,
        free: data.free,
        timestamp: Date.now(),
      });
      logger.info(
        `Memory: ${(data.total - data.free) / 1024 / 1024} MB / ${
          data.total / 1024 / 1024
        } MB`
      );
    },
    30000
  );
  addMonitor();
  memory.startSampling();
}

const memoryMonitor = async () => {
  if (memoryConfig.enable) {
    const configuration = {
      type: "line",
      data: {
        labels: memoryQueue.map((data) =>
          new Date(data.timestamp).toLocaleTimeString()
        ),
        datasets: [
          {
            label: "Used Memory",
            data: memoryQueue.map(
              (data) => (data.total - data.free) / 1024 / 1024
            ),
            fill: false,
            borderColor: "rgb(54, 162, 235)",
            tension: 0.1,
          },
        ],
      },
      options: {
        // add MB unit
        scales: {
          y: {
            ticks: {
              callback: (value: number) => value + " MB",
            },
          },
        },
      },
    } as any;
    const image = await chartJSNodeCanvas.renderToBuffer(configuration);
    return image;
  }
};

const guard = (msg: string) => {
  return msg === "memory";
};

export default {
  guard,
  processor: memoryMonitor,
};
