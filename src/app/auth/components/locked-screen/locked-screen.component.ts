import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-locked-screen',
  templateUrl: './locked-screen.component.html',
  styleUrls: ['./locked-screen.component.scss']
})
export class LockedScreenComponent implements OnInit {

  authenticated: boolean = false;

  constructor(private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authService.authenticated();
  }

  autenticar(): void {
    var token = window.prompt("Informe o token de autenticação");
    if (!token)
      return;

    this.authService.setToken(token);
    this.virtualMachine();
  }

  virtualMachine(): void {
    this.router.navigate(['/virtual-machine']);
  }
}
