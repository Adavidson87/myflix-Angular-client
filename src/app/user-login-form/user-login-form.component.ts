import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param MatDialogRef
   * @param snackBar
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }

  // THis is the function responsible for sending the form inputs to the backend
  /**
   * Function for sending the form inputs to the backend creat a new user
   * @returns alert indicating a succesffull Login or an error
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      // Logic for a successful user Login goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigate(['movies']);
      this.snackBar.open("Login successful", 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open('Incorrect username or password', 'OK', {
        duration: 2000
      });
    });
  }

}
