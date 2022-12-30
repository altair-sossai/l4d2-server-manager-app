import { FailReason } from "./enums/fail-reason.enum";

export interface SuspectedPlayerFileFail {
    communityId: number;
    file: string | null;
    reason: FailReason;
    timestamp: Date | null;
}