import { Status } from "../enums/status.enum";
import { AtivacaoModel } from "../models/ativacao.model";

export class AtivacoesQueryCommand {
    public query?: string;

    public status?: Status[] = [
        Status.NovaAtivacao,
        Status.Liberado,
        Status.ProximoExpirar,
        Status.Expirado,
    ];

    public exibirApenasOsNaoLancadoOrganizze = false;

    public filtrar(ativacoes: AtivacaoModel[]): AtivacaoModel[] {

        if (this.query)
            ativacoes = ativacoes.filter(f => this.contains(f.id, this.query) || this.contains(f.nome, this.query) || this.contains(f.referencia, this.query));

        if (this.status && this.status.length)
            ativacoes = ativacoes.filter(f => this.status?.indexOf(f.status) !== -1);

        if (this.exibirApenasOsNaoLancadoOrganizze)
            ativacoes = ativacoes.filter(f => !f.organizze);

        return ativacoes.sort((a, b) => a.prioridade(b));
    }

    private contains(text?: string, substring?: string): boolean {
        if (!text || !substring)
            return false;

        text = text.toUpperCase();
        substring = substring.toUpperCase();

        return text.indexOf(substring) !== -1;
    }
}