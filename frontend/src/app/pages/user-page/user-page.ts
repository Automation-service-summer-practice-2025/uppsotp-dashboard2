import { Component } from '@angular/core';
import { AppHeader } from "../../features/app-header/app-header";
import { Dashboard } from "../../features/dashboard/dashboard";

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [AppHeader, Dashboard],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {}
