import { ServerInfo } from "../server/info/server-info";

export interface Port {
    portNumber: number;
    serverInfo?: ServerInfo;
    isRunning: boolean;
    connectedPlayers: number;
}