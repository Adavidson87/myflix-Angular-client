import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = [];
  // Favorites: any[] = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  openGenreViewDialog(genre: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { genre },
      // width: '480px'
    })
  }

  openDirectorViewDialog(director: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { director },
      // width: '480px'
    });
  }

  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '480px',
    });
  }

  getFavMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been added to favorites`, 'Ok', { duration: 3000 });
      // this.ngOnInit();
    });
    return this.getFavMovies();
  }

  removeFromFavorites(movieId: string): void {
    this.fetchApiData.removeFromFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been removed from favorites`, 'Ok', { duration: 3000 });
      // this.ngOnInit();
    });
    return this.getFavMovies();
  }

  isMovieOnFavoritesList(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    } else {
      return false;
    }
  }

  favoritesButton(movie: any): void {
    this.isMovieOnFavoritesList(movie._id)
      ? this.removeFromFavorites(movie._id)
      : this.addToFavorites(movie._id);
  }
}