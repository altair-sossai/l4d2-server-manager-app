export interface SuspectedPlayerActivity {
    pingFocused: Date | null;
    pingUnfocused: Date | null;
    process: Date | null;
    screenshot: Date | null;
    fileCheckSuccess: Date | null;
    fileCheckFail: Date | null;
}