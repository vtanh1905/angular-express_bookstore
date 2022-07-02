import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../shared/user/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  onRegisterClick() {
    this.router.navigate(['register']);
  }

  email: string = '';
  password: string = '';

  onSubmitFormLogin() {
    if(this.email === '' || this.password === ''){
      alert('Please type your infomation!')
      return;
    }
    this.userService
      .login(this.email, this.password)
      .pipe(
        tap({
          error: () => alert('Username or Password is not correct'),
        })
      )
      .subscribe((res: any) => {
        this.userService.user = res.user;
        localStorage.setItem('token', res.token); // Set Token on LocalStorage
        this.router.navigate(['/']);
      });
  }
}
