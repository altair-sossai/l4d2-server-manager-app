import { Component, Input } from '@angular/core';
import { Port } from '../../port';

@Component({
  selector: 'app-port-detail',
  templateUrl: './port-detail.component.html',
  styleUrls: ['./port-detail.component.scss']
})
export class PortDetailComponent {
  @Input() port!: Port;
}
