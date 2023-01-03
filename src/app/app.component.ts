import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorService } from './services/http-error.service';

/// <see cref="https://stackblitz.com/edit/angular-material-notification-service" />
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'first-angular-application!';

  constructor(
    private httpError: HttpErrorService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.httpError.erroResponse$.subscribe(err => {
      if (err.message?.length > 0)
        this.openSnackBar(err.message, 'X', 'error-snackbar', 2500);
    });
  }

  /**
 * Displays a toast with provided message
 * @param message Message to display
 * @param action Action text, e.g. Close, Done, etc
 * @param className Optional extra css class to apply
 * @param duration Optional number of SECONDS to display the notification for
 */
  openSnackBar(
    message: string,
    action = 'X',
    className = '',
    duration = 1000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: className,
      verticalPosition: 'top'
    });
  }
}
