import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '');
  directors: any[] = [];
  genre: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getFavMovies();
  }

  getFavMovies(): any {
    this.fetchApiData.viewFavortiesList(this.user.Username).subscribe((res: any) => {
      this.favoriteMovies = res.Favorties;
      return this.favoriteMovies;
    });
  }

  addToFavorites(movieId: string, title: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`${title} has been added to favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  removeFromFavorites(movieId: string, title: string): void {
    this.fetchApiData.removeFromFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`${title} has been removed from favorites`, 'Ok', { duration: 3000 });
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
      : this.addToFavorites(movie._is, movie.Title);
  }

  getGenre(): void {
    this.fetchApiData.getGenre(this.genre).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      return this.genre;
    });
  }

  openGenreViewDialog(Name: string, Description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      // width: '480px'
    })
  }

  getDirector(): void {
    this.fetchApiData.getDirector(this.directors).subscribe((res: any) => {
      this.directors = res;
      console.log(this.directors);
      return this.directors;
    });
  }

  openDirectorViewDialog(Name: string, Bio: string, Birth: any, Death: any): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Bio, Birth, Death },
      // width: '480px'
    });
  }

  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '480px',
    });
  }

}
