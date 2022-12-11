import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerProcess } from '../suspected-player-process';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerProcessService {

    constructor(private http: HttpClient) {
    }

    get(communityId: string): Observable<SuspectedPlayerProcess[]> {
        return this.http.get<SuspectedPlayerProcess[]>(`${environment.apiUrl}/api/suspected-players-process/${communityId}`);
    }
}
