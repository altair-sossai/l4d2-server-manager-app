import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { AtivacaoCommand } from '../commands/ativacao-command';
import { AtivacaoModel } from '../models/ativacao.model';

@Injectable({
    providedIn: 'root'
})
export class AtivacaoService {

    constructor(private http: HttpClient,
        private authService: AuthService) {
    }

    get(): Observable<AtivacaoModel[]> {
        return this.http
            .get<AtivacaoModel[]>(`${environment.apiUrl}/api/consultar-ativacoes`, this.options)
            .pipe(map(itens => itens.map(item => new AtivacaoModel(item))));
    }

    post(id: string, command: AtivacaoCommand): Observable<AtivacaoModel> {
        return this.http
            .post<AtivacaoCommand>(`${environment.apiUrl}/api/alterar-ativacao/${id}`, command, this.options)
            .pipe(map(item => new AtivacaoModel(item)));
    }

    delete(id: string): Observable<any> {
        return this.http
            .delete(`${environment.apiUrl}/api/excluir-ativacao/${id}`, this.options);
    }

    private get options(): object {
        const token = this.authService.getToken();
        const headers = { 'Authorization': token };
        const options = { headers };

        return options;
    };
}
