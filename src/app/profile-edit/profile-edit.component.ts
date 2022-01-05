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
  user: any = JSON.parse(localStorage.getItem('user') || '');

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birth: this.user.Birthday,
  };

  constructor(public fetchApiData: FetchApiDataService, public dialogRef: MatDialogRef<ProfileEditComponent>, public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
    });
  }

  //allows user to edit user info
  editProfile(): void {
    this.fetchApiData.editUserDetails(this.user.Username, this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', JSON.stringify(res));
      console.log(res)
      this.snackBar.open(this.userData.Username, 'Successfully updated profile!', {
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
