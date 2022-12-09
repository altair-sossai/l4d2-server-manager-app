import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SuspectedPlayerPingService } from '../../../suspected-player-ping/services/suspected-player-ping.service';
import { SuspectedPlayerPing } from '../../../suspected-player-ping/suspected-player-ping';
import { ScreenshotResult } from '../../../suspected-player-screenshot/results/screenshot.result';
import { SuspectedPlayerScreenshotService } from '../../../suspected-player-screenshot/services/suspected-player-screenshot.service';
import { SuspectedPlayerService } from '../../services/suspected-player.service';
import { SuspectedPlayer } from '../../suspected-player';

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

  constructor(private route: ActivatedRoute,
    private modalService: NzModalService,
    private suspectedPlayerService: SuspectedPlayerService,
    private suspectedPlayerPingService: SuspectedPlayerPingService,
    private suspectedPlayerScreenshotService: SuspectedPlayerScreenshotService,) {
  }

  ngOnInit(): void {
    this.communityId = this.route.snapshot.paramMap.get('communityId')!;
    this.interval = setInterval(() => this.refreshPing(), 5 * 1000);

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

    this.suspectedPlayerService.find(this.communityId).subscribe(suspectedPlayer => this.suspectedPlayer = suspectedPlayer);
    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
    this.suspectedPlayerScreenshotService.get(this.communityId).subscribe(screenshots => this.screenshots = screenshots);
  }

  refreshPing(): void {
    if (!this.communityId)
      return;

    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
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
}