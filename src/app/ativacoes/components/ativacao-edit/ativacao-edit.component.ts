import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AtivacaoCommand } from '../../commands/ativacao-command';
import { AtivacaoModel } from '../../models/ativacao.model';
import { AtivacaoService } from '../../services/ativacao.service';

@Component({
  selector: 'app-ativacao-edit',
  templateUrl: './ativacao-edit.component.html',
  styleUrls: ['./ativacao-edit.component.scss']
})
export class AtivacaoEditComponent implements OnInit {

  @Input() ativacao!: AtivacaoModel;
  command!: AtivacaoCommand;
  busy = false;

  constructor(private modal: NzModalRef,
    private modalService: NzModalService,
    private message: NzMessageService,
    private ativacaoService: AtivacaoService) {
  }

  ngOnInit(): void {
    this.command = new AtivacaoCommand(this.ativacao);
  }

  get quantidadeDiasParaExpirar(): number {
    var now = new Date();
    var difference = this.command.expiracao.getTime() - now.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    return Math.max(0, days);
  }

  mais30Dias(): void {
    const expiracao = new Date(this.command.expiracao);

    expiracao.setMonth(expiracao.getMonth() + 1);

    this.command.expiracao = expiracao;
  }

  vitalicio(): void {
    const expiracao = new Date(2100, 0, 1);

    this.command.expiracao = expiracao;
  }

  salvar(): void {
    this.busy = true;
    const message = this.message.loading('Atualizando...', { nzDuration: 0 });

    this.ativacaoService.post(this.ativacao.id!, this.command).subscribe(() => {
      this.message.remove(message.messageId);
      this.message.create('success', 'Atualizado com sucesso');
      this.modal.triggerOk();
    }, _ => {
      this.busy = false;
      this.message.remove(message.messageId);
      this.message.create('error', 'Ocorreu um erro');
    });
  }

  excluir(): void {
    this.modalService.confirm({
      nzTitle: 'Deseja realmente excluir?',
      nzOnOk: () => {
        this.busy = true;
        const message = this.message.loading('Excluindo...', { nzDuration: 0 });

        this.ativacaoService.delete(this.ativacao.id!).subscribe(() => {
          this.message.remove(message.messageId);
          this.message.create('success', 'Excluido com sucesso');
          this.modal.triggerOk();
        }, _ => {
          this.busy = false;
          this.message.remove(message.messageId);
          this.message.create('error', 'Ocorreu um erro');
        });
      }
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
