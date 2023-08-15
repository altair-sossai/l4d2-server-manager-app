import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccessLevel } from '../../users/enums/access-level.enum';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/user';

@Component({
  selector: 'app-locked-screen',
  templateUrl: './locked-screen.component.html',
  styleUrls: ['./locked-screen.component.scss']
})
export class LockedScreenComponent implements OnInit {

  authenticated: boolean = false;
  me?: User;

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.authenticated = this.authService.authenticated();
    if (this.authenticated)
      this.userService.me().subscribe(me => this.me = me);
  }

  autenticar(): void {
    var token = window.prompt("Informe o token de autenticação");
    if (!token)
      return;

    this.authService.setToken(token);
    this.userService.me().subscribe(me => this.navigateToPageWithAccess(me));
  }

  navigateToPageWithAccess(me: User): void {
    this.me = me;

    if (this.serversAccess)
      this.virtualMachine();
  }

  virtualMachine(): void {
    this.router.navigate(['/virtual-machine']);
  }

  get serversAccess(): boolean {
    if (!this.me)
      return false;

    return this.me?.accessLevels.indexOf(AccessLevel.Servers) != -1;
  }
}
