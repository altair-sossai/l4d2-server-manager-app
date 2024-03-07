import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VirtualMachine } from '../virtual-machine';

@Injectable({
    providedIn: 'root'
})
export class VirtualMachineService {

    constructor(private http: HttpClient) {
    }

    get(): Observable<VirtualMachine> {
        return this.http.get<VirtualMachine>(`${environment.apiUrl}/api/virtual-machine`);
    }

    restart(): Observable<VirtualMachine> {
        return this.http.put<VirtualMachine>(`${environment.apiUrl}/api/virtual-machine/restart`, {});
    }

    powerOn(): Observable<VirtualMachine> {
        return this.http.put<VirtualMachine>(`${environment.apiUrl}/api/virtual-machine/power-on`, {});
    }

    powerOff(): Observable<VirtualMachine> {
        return this.http.put<VirtualMachine>(`${environment.apiUrl}/api/virtual-machine/power-off`, {});
    }
}
