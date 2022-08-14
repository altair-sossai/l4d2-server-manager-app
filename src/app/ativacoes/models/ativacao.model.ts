import { Status } from "../enums/status.enum";

export class AtivacaoModel {
    constructor(ativacao?: any) {
        if (!ativacao)
            return;

        Object.assign(this, ativacao);

        this.expiracao = new Date(ativacao.expiracao);
    }

    public id?: string;
    public token?: string;
    public referencia?: string;
    public nome?: string;
    public cidade?: string;
    public estado?: string;
    public endereco?: string;
    public enderecoNumero?: string;
    public bairro?: string;
    public cep?: string;
    public telefone?: string;
    public celular?: string;
    public email?: string;
    public site?: string;
    public liberado: boolean = false;
    public organizze: boolean = false;
    public expiracao: Date = new Date();

    get enderecoComNumero(): string {
        return [this.endereco, this.enderecoNumero].filter(f => f).join(', ')
    }

    get cidadeComEstado(): string {
        return [this.cidade, this.estado].filter(f => f).join('/')
    }

    get enderecoCompleto(): string {
        return [this.enderecoComNumero, this.bairro].filter(f => f).join(' - ')
    }

    get telefones(): string {
        return [this.telefone, this.celular].filter(f => f).join(' / ')
    }

    get quantidadeDiasParaExpirar(): number {
        var now = new Date();
        var difference = this.expiracao.getTime() - now.getTime();
        var days = Math.ceil(difference / (1000 * 3600 * 24));

        return Math.max(0, days);
    }

    get novaAtivacao(): boolean {
        return !this.liberado
            && this.quantidadeDiasParaExpirar > 25;
    }

    get expirado(): boolean {
        return this.liberado
            && this.quantidadeDiasParaExpirar === 0;
    }

    get bloqueado(): boolean {
        return !this.liberado
            && this.expiracao.getFullYear() <= 2001;
    }

    get proximoExpirar(): boolean {
        return this.liberado
            && this.quantidadeDiasParaExpirar <= 10;
    }

    get vitalicio(): boolean {
        return this.liberado
            && this.expiracao.getFullYear() >= 2099;
    }

    get status(): Status {
        if (this.novaAtivacao)
            return Status.NovaAtivacao;

        if (!this.liberado)
            return Status.Bloqueado;

        if (this.bloqueado)
            return Status.Bloqueado;

        if (this.expirado)
            return Status.Expirado;

        if (this.proximoExpirar)
            return Status.ProximoExpirar;

        if (this.vitalicio)
            return Status.Vitalicio;

        return Status.Liberado;
    }

    public prioridade(ativacao: AtivacaoModel): number {
        var quantidadeDiasParaExpirar = this.quantidadeDiasParaExpirar - ativacao.quantidadeDiasParaExpirar;

        if (quantidadeDiasParaExpirar === 0)
            return this.nome! > ativacao.nome! ? 1 : -1;

        return quantidadeDiasParaExpirar;
    }
}