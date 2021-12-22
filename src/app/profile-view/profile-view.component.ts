import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
// import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  favorites: any[] = [];
  movies: any[] = []
  showFavorites: any[] = [];
  favoriteMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    // public movieCard: MovieCardComponent,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    let user = JSON.parse(localStorage.getItem('user') || '');
    this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.showFavorites = resp;
      return this.filterMovies();
    });
  }

  filterMovies(): void {
    this.showFavorites.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.favoriteMovies.push(movie);
      }
    });
    return this.favoriteMovies;
  }

  removeFromFavs(id: string, Title: string): void {
    // this.movieCard.removeFromFavorites(id, Title);
  }

  openEditProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      width: '500px'
    })
  }

}
