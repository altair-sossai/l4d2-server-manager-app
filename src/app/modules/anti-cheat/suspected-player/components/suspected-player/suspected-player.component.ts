import { Component, Input } from '@angular/core';
import { SuspectedPlayer } from '../../suspected-player';

@Component({
  selector: 'app-suspected-player',
  templateUrl: './suspected-player.component.html',
  styleUrls: ['./suspected-player.component.scss']
})
export class SuspectedPlayerComponent {
  @Input() suspectedPlayer!: SuspectedPlayer;
}
