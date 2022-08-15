import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/player/player';
import { environment } from 'src/environments/environment';
import { OpenPortCommand } from '../commands/open-port.command';
import { ServerInfo } from '../info/server-info';
import { Server } from '../server';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    constructor(private http: HttpClient) {
    }

    get(port: number): Observable<Server> {
        return this.http.get<Server>(`${environment.apiUrl}/api/server/${port}`);
    }

    info(ip: string, port: number): Observable<ServerInfo> {
        return this.http.get<ServerInfo>(`${environment.apiUrl}/api/server/${ip}:${port}/info`);
    }

    players(ip: string, port: number): Observable<Player[]> {
        return this.http.get<Player[]>(`${environment.apiUrl}/api/server/${ip}:${port}/players`);
    }

    run(port: number): Observable<Server> {
        return this.http.put<Server>(`${environment.apiUrl}/api/server/${port}/run`, {});
    }

    stop(port: number): Observable<Server> {
        return this.http.put<Server>(`${environment.apiUrl}/api/server/${port}/stop`, {});
    }

    openPort(port: number, command: OpenPortCommand): Observable<Server> {
        return this.http.put<Server>(`${environment.apiUrl}/api/server/${port}/open-port`, command);
    }

    closePort(port: number): Observable<Server> {
        return this.http.put<Server>(`${environment.apiUrl}/api/server/${port}/close-port`, {});
    }
}