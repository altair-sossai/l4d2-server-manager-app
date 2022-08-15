import { PortStatus } from "../enums/port-status";

export interface PortInfo {
    status: PortStatus;
    rules: string;
}