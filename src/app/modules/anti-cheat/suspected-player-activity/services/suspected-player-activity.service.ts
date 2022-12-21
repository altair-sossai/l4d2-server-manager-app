import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerActivity } from '../suspected-player-activity';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerActivityService {

    constructor(private http: HttpClient) {
    }

    find(communityId: string): Observable<SuspectedPlayerActivity> {
        return this.http.get<SuspectedPlayerActivity>(`${environment.apiUrl}/api/suspected-players-activity/${communityId}`);
    }
}
