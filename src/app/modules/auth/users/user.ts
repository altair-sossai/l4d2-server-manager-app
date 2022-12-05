import { AccessLevel } from "./enums/access-level.enum";

export interface User {
    id: string;
    displayName: string;
    steam: string;
    accessLevel: AccessLevel;
    accessLevels: AccessLevel[];
}