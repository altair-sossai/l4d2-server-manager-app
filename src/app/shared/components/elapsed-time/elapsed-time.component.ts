import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-elapsed-time',
  templateUrl: './elapsed-time.component.html',
  styleUrls: ['./elapsed-time.component.scss']
})
export class ElapsedTimeComponent implements OnInit, OnDestroy {

  @Input() date: any;

  interval: any;
  elapsedTime: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.updateElapsedTime();
    this.interval = setInterval(() => this.updateElapsedTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.interval)
      clearInterval(this.interval);
  }

  updateElapsedTime() {
    if (!this.date) {
      this.elapsedTime = 0;
      return;
    }

    const now = new Date();
    const powerOnAt = new Date(this.date);

    this.elapsedTime = Math.max(now.getTime() - powerOnAt.getTime(), 0);
  }
}
