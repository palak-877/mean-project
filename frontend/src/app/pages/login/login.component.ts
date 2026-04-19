import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
  this.api.login({
    email: this.email,
    password: this.password
  }).subscribe((res: any) => {

    if (res.token) {
      localStorage.setItem("token", res.token);
      this.router.navigate(['/chat']);
    } else {
      alert(res.message);
    }

  });

}

goToRegister() {
  this.router.navigate(['/register']);
}
}
