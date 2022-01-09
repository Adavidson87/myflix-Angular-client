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

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param MatDialogRef
   * @param snackBar
   */
  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }

  /**
   * Opens Dialog with user information
   */
  openUserProfile(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '500px'
    });
  }

  /**
   * Takes user to page with all movies displayed
   */
  openAllMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Takes user to page with only favorited movies displayed
   */
  openFavorites(): void {
    this.router.navigate(['favorites'])
  }

  /**
   * logs user out
   */
  logOut(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
    this.snackBar.open('Logout successful!', 'OK', {
      duration: 3000
    });
  }

}
