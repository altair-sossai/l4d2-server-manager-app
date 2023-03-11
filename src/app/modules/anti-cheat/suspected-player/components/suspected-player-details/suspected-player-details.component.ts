import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IpResult } from '../../../player-ip/results/ip.result';
import { PlayerIpService } from '../../../player-ip/services/player-ip.service';
import { PlayerResult } from '../../../player/results/player.result';
import { SuspectedPlayerActivityService } from '../../../suspected-player-activity/services/suspected-player-activity.service';
import { SuspectedPlayerActivity } from '../../../suspected-player-activity/suspected-player-activity';
import { SuspectedPlayerFileFailService } from '../../../suspected-player-file-fail/services/suspected-player-file-fail.service';
import { SuspectedPlayerFileFail } from '../../../suspected-player-file-fail/suspected-player-file-fail';
import { SuspectedPlayerMetadataService } from '../../../suspected-player-metadata/services/suspected-player-metadata.service';
import { SuspectedPlayerMetadata } from '../../../suspected-player-metadata/suspected-player-metadata';
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
  public metadatas?: SuspectedPlayerMetadata[];
  public activity?: SuspectedPlayerActivity;
  public currentIp?: string | null;
  public lastIp?: IpResult;
  public ips?: IpResult[];
  public playersWithSameIp?: PlayerResult[];
  public filesFail?: SuspectedPlayerFileFail[];

  public screenshotPage = { skip: 0, take: 100, pageSize: 100, eof: false };

  constructor(private route: ActivatedRoute,
    private modalService: NzModalService,
    private suspectedPlayerService: SuspectedPlayerService,
    private suspectedPlayerPingService: SuspectedPlayerPingService,
    private suspectedPlayerScreenshotService: SuspectedPlayerScreenshotService,
    private suspectedPlayerProcessService: SuspectedPlayerProcessService,
    private suspectedPlayerMetadataService: SuspectedPlayerMetadataService,
    private suspectedPlayerActivityService: SuspectedPlayerActivityService,
    private suspectedPlayerFileFailService: SuspectedPlayerFileFailService,
    private playerIpService: PlayerIpService) {
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
    this.metadatas = undefined;
    this.activity = undefined;
    this.currentIp = undefined;
    this.lastIp = undefined;
    this.ips = undefined;
    this.playersWithSameIp = undefined;
    this.filesFail = undefined;

    this.screenshotPage.skip = 0;
    this.screenshotPage.eof = false;

    this.suspectedPlayerService.find(this.communityId).subscribe(suspectedPlayer => this.suspectedPlayer = suspectedPlayer);
    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
    this.suspectedPlayerScreenshotService.get(this.communityId, this.screenshotPage.skip, this.screenshotPage.take).subscribe(screenshots => this.screenshots = screenshots);
    this.suspectedPlayerProcessService.get(this.communityId).subscribe(processes => this.processes = processes);
    this.suspectedPlayerMetadataService.get(this.communityId).subscribe(metadatas => this.metadatas = metadatas);
    this.suspectedPlayerActivityService.find(this.communityId).subscribe(activity => this.activity = activity);
    this.suspectedPlayerFileFailService.get(this.communityId).subscribe(filesFail => this.filesFail = filesFail);

    this.playerIpService.getAllPlayerIps(this.communityId).subscribe(ips => {
      this.ips = ips;

      if (ips.length === 0) {
        this.playersWithSameIp = [];
        return;
      }

      const ip = ips[0];

      this.lastIp = ip;
      this.currentIp = ip.ip;
      this.getAllPlayersWithIp(ip.ip!);
    });
  }

  refreshPing(): void {
    if (!this.communityId)
      return;

    this.suspectedPlayerPingService.get(this.communityId).subscribe(ping => this.ping = ping);
  }

  getAllPlayersWithIp(ip?: string | null): void {
    this.playersWithSameIp = undefined;

    if (!ip) {
      this.playersWithSameIp = [];
      return;
    }

    this.playerIpService.getAllPlayersWithIp(ip).subscribe(players => this.playersWithSameIp = players.filter(f => f.communityId !== this.communityId));
  }

  screenshotPrevious(): void {
    this.screenshotPage.skip = Math.max(0, this.screenshotPage.skip - this.screenshotPage.pageSize);
    this.loadScreenshot();
  }

  screenshotNext(): void {
    this.screenshotPage.skip += this.screenshotPage.pageSize;
    this.loadScreenshot();
  }

  loadScreenshot(): void {
    if (!this.communityId)
      return;

    this.screenshots = undefined;
    this.suspectedPlayerScreenshotService.get(this.communityId, this.screenshotPage.skip, this.screenshotPage.take).subscribe(screenshots => {
      this.screenshotPage.eof = screenshots.length === 0;
      this.screenshots = screenshots;
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
      nzTitle: 'Atenção, todas as screenshots serão apagadas, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerScreenshotService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }

  deleteAllProcesses(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os processos serão apagados, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerProcessService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }

  deleteAllMedatadas(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os metadados serão apagados, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerMetadataService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }

  deleteAllIps(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os ip\'s serão apagados, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.playerIpService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }

  deleteAllFilesFail(): void {
    this.modalService.confirm({
      nzTitle: 'Atenção, todos os arquivos com falha serão apagados, deseja continuar?',
      nzOnOk: () => {
        this.screenshots = undefined;
        this.suspectedPlayerFileFailService.delete(this.communityId!).subscribe(() => this.refresh());
      }
    });
  }
}
