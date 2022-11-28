import { PortInfo } from "../virtual-machine/value-objects/port-info";

export interface Server {
    ipAddress: string;
    port: number;
    isRunning: boolean;
    portInfo: PortInfo;
    permissions: string[];
    startedBy: string;
    startedAt: Date;
}