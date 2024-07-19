export const help = () => {
  const help = [
    "服务器状态: 查询服务器状态",
    "在线玩家: 查询在线玩家",
    "查询玩家 [玩家名]: 查询指定在线玩家信息",
    "gc: 执行垃圾回收",
    "tps: 查询服务器TPS",
    "开启死亡: 开启死亡log",
    "关闭死亡: 关闭死亡log",
  ];
  return help.join("\n");
};
