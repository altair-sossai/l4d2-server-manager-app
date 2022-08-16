import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Port } from '../port';

@Injectable({
    providedIn: 'root'
})
export class PortService {

    constructor(private http: HttpClient) {
    }

    get(ip: string): Observable<Port[]> {
        return this.http.get<Port[]>(`${environment.apiUrl}/api/ports/${ip}`);
    }
}
