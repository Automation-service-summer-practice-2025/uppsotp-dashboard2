import { Component } from '@angular/core';
import { Header } from '../../features/header/header';
import { Dashboard } from '../../features/dashboard/dashboard';
import { ViewModeService } from '../../services/view-mode.service';

@Component({
  selector: 'user-page',
  standalone: true,
  imports: [Header, Dashboard],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  constructor(private viewModeService: ViewModeService) {
    this.viewModeService.setEditMode(false);
  }
}
