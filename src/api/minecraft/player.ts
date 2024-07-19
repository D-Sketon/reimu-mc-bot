import request from "./http";

interface Player {
  uuid: string;
  displayName: string;
  health: number;
  saturation: number;
  hunger: number;
  location: number[];
  dimension: string;
}

export const allPlayers = (): Promise<Player[]> =>
  request({
    method: "get",
    url: "/players",
  });

export const player = (uuid: string): Promise<Player> =>
  request({
    method: "get",
    url: `/players/${uuid}`,
  });
