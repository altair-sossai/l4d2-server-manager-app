import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SuspectedPlayerPingService } from '../../../suspected-player-ping/services/suspected-player-ping.service';
import { SuspectedPlayerPing } from '../../../suspected-player-ping/suspected-player-ping';
import { SuspectedPlayerProcessService } from '../../../suspected-player-process/services/suspected-player-process.service';
import { SuspectedPlayerProcess } from '../../../suspected-player-process/suspected-player-process';
import { ScreenshotResult } from '../../../suspected-player-screenshot/results/screenshot.result';
import { SuspectedPlayerScreenshotService } from '../../../suspected-player-screenshot/services/suspected-player-screenshot.service';
import { SuspectedPlayerService } from '../../services/suspected-player.service';
import { SuspectedPlayer } from '../../suspected-player';
import { SuspectedPlayerProcessDetailComponent } from '../suspected-player-process-detail/suspected-player-process-detail.component';

@Component({
  selector: 'app-suspected-player-details',
  templateUrl: './suspected-player-details.component.html',
  styleUrls: ['./suspected-player-details.component.scss']
})
export class SuspectedPlayerDetailsComponent implements OnInit, OnDestroy {

  private communityId?: string;
  private interval: any;

  public suspectedPlayer?: SuspectedPlayer;
  public ping?: SuspectedPlayerPing;
  public screenshots?: ScreenshotResult[];
  public processes?: SuspectedPlayerProcess[];

  public screenshotPage = { skip: 0, take: 500, pageSize: 500, eof: false };

  constructor(private route: ActivatedRoute,
    private modalService: NzModalService,
    private suspectedPlayerService: SuspectedPlayerService,
    private suspectedPlayerPingService: SuspectedPlayerPingService,
    private suspectedPlayerScreenshotService: SuspectedPlayerScreenshotService,
    private suspectedPlayerProcessService: SuspectedPlayerProcessService) {
  }

  ngOnInit(): void {
    this.communityId = this.route.snapshot.paramMap.get('communityId')!;
    this.interval = setInterval(() => this.refreshPing(), 15 * 1000);

    this.refresh();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  refresh(): void {
    if (!this.communityId)
      return;

    this.suspectedPlayer = undefined;
    this.ping = undefined;
    this.screenshots = undefined;
    this.processes = undefined;

    this.screenshotPage.skip = 0;
    this.screenshotPage.eof = false;

    this.suspectedPlayerService.find(this.communityId).subscribe(suspectedPlayer => this.suspectedPlayer = suspectedPlayer);
    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
    this.suspectedPlayerScreenshotService.get(this.communityId, this.screenshotPage.skip, this.screenshotPage.take).subscribe(screenshots => this.screenshots = screenshots);
    this.suspectedPlayerProcessService.get(this.communityId).subscribe(processes => this.processes = processes);
  }

  refreshPing(): void {
    if (!this.communityId)
      return;

    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
  }

  loadMoreScreenshots(): void {
    if (!this.communityId)
      return;

    this.screenshotPage.skip += this.screenshotPage.pageSize;
    this.suspectedPlayerScreenshotService.get(this.communityId, this.screenshotPage.skip, this.screenshotPage.take).subscribe(screenshots => {
      this.screenshotPage.eof = screenshots.length === 0;
      this.screenshots?.push(...screenshots);
    });
  }

  showProcessDetails(process: SuspectedPlayerProcess): void {
    this.modalService.create({
      nzTitle: process.processName || '',
      nzContent: SuspectedPlayerProcessDetailComponent,
      nzComponentParams: { process }
    });
  }

  deleteAllScreenshots(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todas as screenshots do jogador serão apagadas, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerScreenshotService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }

  deleteAllProcesses(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os processos do jogador serão apagados, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerProcessService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }
}
