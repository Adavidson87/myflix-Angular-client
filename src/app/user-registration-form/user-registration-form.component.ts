import { Component, Input, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
  * Called when creating an instance of the class
  * @param fetchApiData
  * @param MatDialogRef
  * @param snackBar
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void { }

  //allows users to register a new profile
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open("You have successfully registered!", 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open("Registration unsuccessful, please try again.", 'OK', {
        duration: 2000
      });
    });
  }

}
