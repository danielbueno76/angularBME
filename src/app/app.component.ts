import { EmpleadosMockService } from './services/empleados-mock.service';
import { Component } from '@angular/core';
import { AuthenticationService } from './security/services/authentication.service';
import { OAuth2Service } from './security/services/o-auth2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'empleados';

  constructor(private authService: AuthenticationService){}
}
