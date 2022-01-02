import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  //displays user information
  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
    });
  }

  //opens modal so user may edit profile information
  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px'
    })
  }

}
