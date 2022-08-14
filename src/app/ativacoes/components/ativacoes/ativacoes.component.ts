import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StatusDescription, StatusValues } from '../../enums/status.enum';
import { AtivacaoModel } from '../../models/ativacao.model';
import { AtivacoesQueryCommand } from '../../query-commands/ativacoes-query-command';
import { AtivacaoService } from '../../services/ativacao.service';
import { AtivacaoEditComponent } from '../ativacao-edit/ativacao-edit.component';

@Component({
  selector: 'app-ativacoes',
  templateUrl: './ativacoes.component.html',
  styleUrls: ['./ativacoes.component.scss']
})
export class AtivacoesComponent implements OnInit {

  ativacoes?: AtivacaoModel[];
  queryCommand = new AtivacoesQueryCommand();

  StatusValues = StatusValues;
  StatusDescription = StatusDescription;

  constructor(private router: Router,
    private ativacaoService: AtivacaoService,
    private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.ativacoes = undefined;
    this.ativacaoService.get().subscribe(ativacoes => this.ativacoes = this.queryCommand.filtrar(ativacoes));
  }

  autenticar(): void {
    this.router.navigate(['/auth']);
  }

  editar(ativacao: AtivacaoModel): void {
    this.modalService.create({
      nzTitle: ativacao.nome,
      nzContent: AtivacaoEditComponent,
      nzComponentParams: { ativacao },
      nzOnOk: () => this.search(),
      nzStyle: this.mobile() ? { top: '25px' } : undefined
    });
  }

  mobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
