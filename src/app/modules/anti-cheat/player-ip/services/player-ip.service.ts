import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlayerResult } from '../../player/results/player.result';
import { IpResult } from '../results/ip.result';

@Injectable({
    providedIn: 'root'
})
export class PlayerIpService {

    constructor(private http: HttpClient) {
    }

    getAllPlayerIps(communityId: string): Observable<IpResult[]> {
        return this.http.get<IpResult[]>(`${environment.apiUrl}/api/player-ip/${communityId}/ips`);
    }

    getAllPlayersWithIp(ip: string): Observable<PlayerResult[]> {
        return this.http.get<PlayerResult[]>(`${environment.apiUrl}/api/player-ip/${ip}/players`);
    }

    delete(communityId: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/player-ip/${communityId}`);
    }
}
