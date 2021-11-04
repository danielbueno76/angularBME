import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { MensajesService } from 'src/app/services/mensajes.service';
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User();

  private returnUrl: string;



  constructor(

      private router: Router,

      private route: ActivatedRoute,

      private authenticationService: AuthenticationService,

      private mensajesService: MensajesService

  ) {

    if (this.authenticationService.isUserAuthenticated()) {

      this.router.navigate([environment.common.successLoginRoute]);

    }

  }



  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] 

        || environment.common.successLoginRoute;

  }



  onLogin() {

    this.authenticationService.login(this.user.username, this.user.password).subscribe(

      user => this.router.navigate([this.returnUrl]),

      error => {

        this.mensajesService.addMensaje('Error de autenticación');

        console.log(error)

      }

    );

  }
}
