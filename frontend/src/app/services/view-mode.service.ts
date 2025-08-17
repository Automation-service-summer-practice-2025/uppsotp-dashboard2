import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewModeService {
  isAdminMode$ = new BehaviorSubject<boolean>(true);

  setEditMode(isEdit: boolean) {
    this.isAdminMode$.next(isEdit);
  }

  get isAdminMode() {
    return this.isAdminMode$.value;
  }
}
