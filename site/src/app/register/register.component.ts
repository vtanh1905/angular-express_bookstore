import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../shared/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  rePassword: string = '';

  constructor(private router: Router, private userService: UserService) {}

  onButtonCreate() {
    if(this.email === '' || this.password === '' || this.rePassword === ''){
      alert('Please type your infomation!')
      return;
    }
    if(this.password !== this.rePassword){
      alert('Re-Password is not the same Password')
      return
    }
    this.userService.register(this.email, this.password).pipe(
      tap({
        error: () => alert('There are something wrong'),
      })
    ).subscribe((res) => {
      this.router.navigate(['login']);
      alert('Register Successfully')
    });
  }

  onButtonBack() {
    this.router.navigate(['login']);
  }
}
