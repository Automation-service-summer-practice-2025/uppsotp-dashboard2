import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private router: Router) {}

  login(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.router.navigate(['/admin']);
  }

  redirectToUserPage(): void {
    this.router.navigate(['']);
  }
}
