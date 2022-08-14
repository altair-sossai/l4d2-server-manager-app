import { AtivacaoModel } from "../models/ativacao.model";

export class AtivacaoCommand {

    constructor(ativacao: AtivacaoModel) {
        this.referencia = ativacao.referencia;
        this.liberado = ativacao.liberado;
        this.organizze = ativacao.organizze;
        this.expiracao = ativacao.expiracao;
    }

    public referencia?: string;
    public liberado: boolean = false;
    public organizze: boolean = false;
    public expiracao: Date = new Date();
}