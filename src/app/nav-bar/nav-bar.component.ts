import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

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

  //opens users profile
  openUserProfile(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '500px'
    });
  }

  //takes user to main list of movies
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  //takes user to page displaying favorite movies
  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  //logs user off
  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
