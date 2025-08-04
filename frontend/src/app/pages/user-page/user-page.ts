import { Component } from '@angular/core';
import { Header } from '../../features/header/header';
import { Dashboard } from '../../features/dashboard/dashboard';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [Header, Dashboard],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {}
