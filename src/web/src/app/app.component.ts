import { Component } from '@angular/core';
import { User } from './shared/user/user.model';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  user: User = { _id: '', email: '' };
  constructor(private userService: UserService) {
    if (this.userService.user._id !== '') {
      this.user = this.userService.user;
    }
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if (token !== null) {
      this.userService.reLogin(token).subscribe((res: any) => {
        this.user = this.userService.user = {
          _id: res._id,
          email: res.email,
        };
      });
    }
  }

  ngDoCheck() {
    if (this.userService.user._id !== '') {
      this.user = this.userService.user;
    }
  }
}
