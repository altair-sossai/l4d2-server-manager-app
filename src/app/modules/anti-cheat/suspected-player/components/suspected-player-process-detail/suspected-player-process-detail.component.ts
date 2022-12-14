import { Component, Input } from '@angular/core';
import { SuspectedPlayerProcess } from '../../../suspected-player-process/suspected-player-process';

@Component({
  selector: 'app-suspected-player-process-detail',
  templateUrl: './suspected-player-process-detail.component.html',
  styleUrls: ['./suspected-player-process-detail.component.scss']
})
export class SuspectedPlayerProcessDetailComponent {
  @Input() process!: SuspectedPlayerProcess;
}
