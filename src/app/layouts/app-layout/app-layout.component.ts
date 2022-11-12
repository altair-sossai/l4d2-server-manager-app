import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {

  version = environment.version;

  constructor(private router: Router) {
  }

  auth(): void {
    this.router.navigate(['/auth']);
  }
}
