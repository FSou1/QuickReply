import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor (private _snackBar: MatSnackBar) { }

  show (message: string): void {
    this._snackBar.open(message, null, {
      duration: 2000
    });
  }
}
