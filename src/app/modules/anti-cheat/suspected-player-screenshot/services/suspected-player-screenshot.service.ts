import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ScreenshotResult } from '../results/screenshot.result';

@Injectable({
    providedIn: 'root'
})
export class SuspectedPlayerScreenshotService {

    constructor(private http: HttpClient) {
    }

    get(communityId: string, skip: number, take: number): Observable<ScreenshotResult[]> {
        return this.http.get<ScreenshotResult[]>(`${environment.apiUrl}/api/suspected-players-screenshot/${communityId}`, { params: { skip, take } });
    }

    delete(communityId: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/api/suspected-players-screenshot/${communityId}`);
    }
}
