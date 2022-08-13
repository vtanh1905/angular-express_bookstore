import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';



@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000';
  user : User = {_id : "", email: ""};



  login(email: string, password: string) {
    return this.http.post(`${this.URL}/login`, { email, password });
  }

  reLogin(token: string) {
    return this.http.post(
      `${this.URL}/re-login`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  register(email: string, password: string) {
    return this.http.post(`${this.URL}/register`, { email, password });
  }
}
