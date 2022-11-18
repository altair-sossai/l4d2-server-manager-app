import { Campaign } from "../enums/campaign.enum";

export interface ServerInfo {
    addr: string | null;
    gameport: number;
    steamid: string | null;
    name: string | null;
    appid: number;
    gamedir: string | null;
    version: string | null;
    product: string | null;
    region: number;
    players: number;
    maxPlayers: number;
    bots: number;
    map: Campaign;
    secure: boolean;
    dedicated: boolean;
    os: string | null;
    gametype: string | null;
}