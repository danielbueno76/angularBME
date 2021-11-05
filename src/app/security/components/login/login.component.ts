import { Component, OnInit } from '@angular/core';
import { OAuth2Service } from './../../services/o-auth2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private oAuthService: OAuth2Service) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.oAuthService.doLogin();
  }
}
