import { PortStatus } from "../enums/port-status.enum";

export interface PortInfo {
    status: PortStatus;
    rules: string;
}