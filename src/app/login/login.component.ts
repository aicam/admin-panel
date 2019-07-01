import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service';
@Component({
  selector: 'ngx-bootstrap',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  http: any;
  authService: any;
  constructor(_http: HttpClient, authService: AuthService) {
    this.http = _http;
    this.authService = authService;
  }
  on_click () {
    const auth = {username: this.email, password: this.password};
    this.authService.login(this.email, this.password);
  }
}
