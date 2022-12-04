import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerCommand } from '../commands/suspected-player.command';
import { SuspectedPlayer } from '../suspected-player';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerService {

    constructor(private http: HttpClient) {
    }

    get(): Observable<SuspectedPlayer[]> {
        return this.http.get<SuspectedPlayer[]>(`${environment.apiUrl}/api/suspected-players`);
    }

    find(communityId: number): Observable<SuspectedPlayer> {
        return this.http.get<SuspectedPlayer>(`${environment.apiUrl}/api/suspected-players/${communityId}`);
    }

    post(command: SuspectedPlayerCommand): Observable<SuspectedPlayer> {
        return this.http.post<SuspectedPlayer>(`${environment.apiUrl}/api/suspected-players`, command);
    }

    delete(communityId: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/suspected-players/${communityId}`);
    }
}
