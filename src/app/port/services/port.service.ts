import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PortService {

    constructor(private http: HttpClient) {
    }

    get(): Observable<number[]> {
        return this.http.get<number[]>(`${environment.apiUrl}/api/ports`);
    }
}
