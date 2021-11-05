import { Component } from '@angular/core';
import { OAuth2Service } from './security/services/o-auth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'halloween';
  private isUserAuthenticated = false;

  constructor(private oAuthService: OAuth2Service) {}

  ngOnInit() {
    this.oAuthService.checkAuth().subscribe((auth) => this.isUserAuthenticated = auth);
  }

  logout() {
    this.oAuthService.logout();
  }
}
