import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

const username = localStorage.getItem('username')

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(
    public snackBar: MatSnackBar, 
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  openUserProfile(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '500px'
    } );
  }

  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
