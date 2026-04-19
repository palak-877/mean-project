import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

// ✅ ADD THIS
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  email = '';
  password = '';

  // ✅ MODIFY CONSTRUCTOR
  constructor(private api: ApiService, private router: Router) {}

  // ✅ MODIFY FUNCTION
  register() {
  this.api.register({
    email: this.email,
    password: this.password
  }).subscribe({
    next: (res: any) => {

      if (res.message === "User already exists") {
        alert(res.message);
      } else {
        alert(res.message);
        this.router.navigate(['/']);
      }

    },
    error: () => {
      alert("Something went wrong");
    }
  });
}
}