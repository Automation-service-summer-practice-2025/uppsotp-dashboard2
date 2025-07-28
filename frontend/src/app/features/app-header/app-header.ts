import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeader {
  isVisible = false;

  constructor(private router: Router) {}

  isOnPage(endpoint: string): boolean {
    return this.router.url === endpoint;
  }

  toggleVisibility(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  redirectToPage(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
