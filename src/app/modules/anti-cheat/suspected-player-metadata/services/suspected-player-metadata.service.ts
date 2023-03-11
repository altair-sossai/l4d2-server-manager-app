import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerMetadata } from '../suspected-player-metadata';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerMetadataService {

    constructor(private http: HttpClient) {
    }

    get(communityId: string): Observable<SuspectedPlayerMetadata[]> {
        return this.http.get<SuspectedPlayerMetadata[]>(`${environment.apiUrl}/api/suspected-players-metadata/${communityId}`);
    }

    delete(communityId: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/suspected-players-metadata/${communityId}`);
    }
}
