import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerPing } from '../suspected-player-ping';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerPingService {

    constructor(private http: HttpClient) {
    }

    get(communityId: string): Observable<SuspectedPlayerPing> {
        return this.http.get<SuspectedPlayerPing>(`${environment.apiUrl}/api/suspected-players-ping/${communityId}`);
    }
}
