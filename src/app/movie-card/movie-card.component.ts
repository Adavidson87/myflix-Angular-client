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
export class MovieCardComponent {
  movies: any[] = [];
  // movie: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favoriteMovies: any[] = this.user.FavoriteMovies;

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

  getFavMovies(): any {
    this.fetchApiData.viewFavortiesList(this.user.Username).subscribe((res: any) => {
      this.user.favoriteMovies = res.Favorties;
      return this.user.favoriteMovies;
    });
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been added to favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  removeFromFavorites(movieId: string, title: string): void {
    this.fetchApiData.removeFromFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been removed from favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  isMovieOnFavoritesList(movieId: string): boolean {
    return this.favoriteMovies.some((movie) => movie._id === movieId);
  }

  favoritesButton(movie: any): void {
    this.isMovieOnFavoritesList(movie._id)
      ? this.removeFromFavorites(movie._id, movie.Title)
      : this.addToFavorites(movie._id);
  }
}
