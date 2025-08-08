import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private router: Router) {}

  isOnPage(endpoint: string): boolean {
    return this.router.url === endpoint;
  }

  redirectToPage(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
