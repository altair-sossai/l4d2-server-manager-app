export interface PlayerResult {
    communityId: string;
    steamId: string | null;
    steam3: string | null;
    name: string | null;
    pictureUrl: string | null;
    profileUrl: string | null;
    totalHoursPlayed: number;
}