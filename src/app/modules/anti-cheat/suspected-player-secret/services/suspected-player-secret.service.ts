import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerSecretService {

    constructor(private http: HttpClient) {
    }

    delete(communityId: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/suspected-players-secret/${communityId}`);
    }
}
