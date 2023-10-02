import { PortStatus } from "../virtual-machine/enums/port-status.enum";

export interface Server {
    ipAddress: string;
    port: number;
    isRunning: boolean;
    portStatus: PortStatus;
    permissions: string[];
    startedBy: string;
    startedAt: Date;
}