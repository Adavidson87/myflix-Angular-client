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
  movies: any = [];
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = [];
  genres: any = [];
  directors: any = [];

  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
    // this.getGenre();
    // this.getDirector();
  }

  //gets list of all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
      return this.movies;
    });
  }

  getGenre(): void {
    this.fetchApiData.getGenre(this.genres).subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    })
  }

  getDirector(): void {
    this.fetchApiData.getDirector(this.directors).subscribe((resp: any) => {
      this.directors = resp;
      console.log(this.directors);
      return this.directors;
    })
  }

  //opens modal with genre information
  openGenreViewDialog(genre: string): void {
    this.dialog.open(GenreViewComponent, {
      // data: { genre },
      // width: '480px'
    })
  }

  //opens modal with director information
  openDirectorViewDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Bio, Birth, Death },
      // width: '480px'
    });
  }

  //opens modal with synopsis information
  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '480px',
    });
  }

  //gets a list of users favorite movies
  getFavMovies(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      // console.log(this.favorites);
      return this.favorites;
    });
  }

//function that allows user to add movie to favorites when favorites button is pressed
  addToFavorites(movieId: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been added to favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  //function that removes movies from favorites list when favorites button is pressed
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.removeFromFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been removed from favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  //tells favorites button if movie is on favorites list
  isMovieOnFavoritesList(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    } else {
      return false;
    }
  }

  //button that lets users add or remove movies from favorites list
  favoritesButton(movie: any): void {
    this.isMovieOnFavoritesList(movie._id)
      ? this.removeFromFavorites(movie._id)
      : this.addToFavorites(movie._id);
  }
}