import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  @Input() userData = {
    username: '',
    password: '',
    email: '',
    birth: '',
  };

  constructor(public fetchApiData: FetchApiDataService, public dialogRef: MatDialogRef<ProfileEditComponent>, public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  editProfile(): void {
    this.fetchApiData.editUserDetails(this.userData.username, this.userData).subscribe((res) => {
      this.dialogRef.close();
      // localStorage.setItem('user', JSON.stringify(res));
      console.log(res)
      this.snackBar.open(this.userData.username, 'Successfully updated profile!', {
        duration: 3000
      });
    }, (res) => {
      this.snackBar.open(res, 'OK', {
        duration: 3000
      });
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    })
  }
}
