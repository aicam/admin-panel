import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';
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
  constructor(_http: HttpClient, authService: AuthService, private router: Router) {
    this.http = _http;
    this.authService = authService;
  }
  async on_click() {
    const auth = {username: this.email, password: this.password};
    await this.authService.login(this.email, this.password);
    this.router.navigateByUrl('pages/sensorsData');
  }
}
