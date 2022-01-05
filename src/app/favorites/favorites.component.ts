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
  movies: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = [];
  favoriteMovies: any = [];
  genre: any = [];
  director: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  //gets list of favorite movies
  getFavMovies(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      // console.log(this.favorites);
      return this.favorites;
    });
  }

  //get list of all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies)
      return this.filterMovies(this.movies);
    });
  }

  //compares list of movies and lists of favorites and combines on new array to be read by html file
  filterMovies(movie: any): void {
    let favoriteId = this.favorites;
    let movieList = movie._id;
      if (favoriteId === movieList) {
       this.favoriteMovies.push(movieList);
      }
      // console.log(this.favoriteMovies);
    return this.favoriteMovies;
  }

  // gets genre info
  getGenre(Genre: any): void {
    this.fetchApiData.getGenre(Genre).subscribe((resp: any) => {
      this.genre = resp;
      let genreName = this.genre.Name
      let genreDescription = this.genre.Description
      console.log(this.genre);
      return this.openGenreViewDialog(genreName, genreDescription);
    })
  }

  //opens modal with genre information
  openGenreViewDialog(Name: any, Description: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      width: '480px'
    })
  }

  // gets director info
  getDirector(Director: any): void {
    this.fetchApiData.getDirector(Director).subscribe((resp: any) => {
      this.director = resp;
      let directorName = this.director.Name
      let directorBio = this.director.Bio
      let directorBirth = this.director.Birth
      let directorDeath = this.director.Death
      console.log(this.director);
      return this.openDirectorViewDialog(directorName, directorBio, directorBirth, directorDeath);
    })
  }

  //opens modal with director information
  openDirectorViewDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Bio, Birth, Death },
      width: '480px'
    });
  }

  //opens modal with synopsis information
  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '480px',
    });
  }

  //function that adds movies to favorites list when favorites button is pressed
  addToFavorites(movieId: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been added to favorites`, 'Ok', { duration: 3000 });
      // this.ngOnInit();
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

  //lets favorite button know if movie is on favorites list
  isMovieOnFavoritesList(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    } else {
      return false;
    }
  }

  //button that allows user to add and remove movie from favorites
  favoritesButton(movie: any): void {
    this.isMovieOnFavoritesList(movie._id)
      ? this.removeFromFavorites(movie._id)
      : this.addToFavorites(movie._id);
  }
}