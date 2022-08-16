import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  constructor(private router: Router) {
  }

  auth(): void {
    this.router.navigate(['/auth']);
  }
}
