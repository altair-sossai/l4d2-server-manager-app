import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuspectedPlayerFileFail } from '../suspected-player-file-fail';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerFileFailService {

    constructor(private http: HttpClient) {
    }

    get(communityId: string): Observable<SuspectedPlayerFileFail[]> {
        return this.http.get<SuspectedPlayerFileFail[]>(`${environment.apiUrl}/api/suspected-players-file-check-fail/${communityId}`);
    }

    delete(communityId: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/suspected-players-file-check-fail/${communityId}`);
    }
}
