import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  username: string = '';
  private token: string = '';
  constructor(private http: HttpClient) {}
  getToken () {
    return this.token;
  }
  login(email: string, password: string) {
    const auth = {username: email, password: password};
    this.http.post<{status: string, token: string}>('http://localhost:3000/api/login', auth).subscribe(response => {
      const token = response.token;
      this.token = token;
    });
  }
}
