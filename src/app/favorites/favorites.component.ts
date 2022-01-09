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

  /**
   * variables used in the component
   * @ignore
   */
  movies: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '');
  favorites: any[] = [];
  favoriteMovies: any = [];
  genre: any = [];
  director: any = [];

  /**
   * Called when creating an instance of the class
   * @param fetchApiData
   * @param MatDialogRef
   * @param snackBar
   * @param Router
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
  }

  /**
   * Calls fetchApiData in order to get the array of FavoriteMovies from the user object
   * @return those movies' @param _id to the this.favorites variable allowing user
   * to view favoritied movies.
   */
  getFavMovies(): void {
    this.fetchApiData.getUser(this.user.Username).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      // console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   *  Calls fetchApiData in order to get a list of all movies in database.
   *  adds those @param movies to the this.movies variable
   *  @return this.filterMovies with this.movies in order to have them compared to favorites list
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies)
      return this.filterMovies(this.movies);
    });
  }

  /**
   * Compares the @param _id in this.favorites to the @param movie._id in this.movies.
   * @if ids match then it pushes @param movie._id to favoriteMovies variable
   * @return the this.favoriteMovies variable
   */
  filterMovies(movie: any): void {
    let favoriteId = this.favorites;
    let movieList = movie._id;
    if (favoriteId === movieList) {
      this.favoriteMovies.push(movieList);
    }
    // console.log(this.favoriteMovies);
    return this.favoriteMovies;
  }

  /**
   * Calls fetchApiData to retrieve information about @param Genre and adds it to this.genre variable
   * @return @param GenreName and @param GenreDescrption to this.openGenreViewDialog in order
   * for user to view information.
   */
  getGenre(Genre: any): void {
    this.fetchApiData.getGenre(Genre).subscribe((resp: any) => {
      this.genre = resp;
      let genreName = this.genre.Name
      let genreDescription = this.genre.Description
      // console.log(this.genre);
      return this.openGenreViewDialog(genreName, genreDescription);
    })
  }

  /**
   * Takes @param genreName and @param genreDescription and opens modal with information about genre
   */
  openGenreViewDialog(Name: any, Description: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { Name, Description },
      width: '480px'
    })
  }

  /**
   * Calls fetchApiData to retrieve information about @param Director and adds it to this.director variable
   * @return @param directorName @param directorBio @param directorBirth and @param directorDeath to this.openDirectorViewDialog in order
   * for user to view information.
   */
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

  /**
   * Opens modal with director information
   * @param Name 
   * @param Bio 
   * @param Birth 
   * @param Death 
   */
  openDirectorViewDialog(Name: string, Bio: string, Birth: string, Death: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name, Bio, Birth, Death },
      width: '480px'
    });
  }

  /**
   * Opens modal with movie title and synopsis of movie
   * @param title 
   * @param description 
   */
  openSynopsisViewDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '480px',
    });
  }

  /**
   * Allows a movie to be added to favorites list
   * @param movieId 
   * @returns updated favorites list wtih movie added
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData.addToFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been added to favorites`, 'Ok', { duration: 3000 });
      // this.ngOnInit();
    });
    return this.getFavMovies();
  }

  /**
   * Removes a movie from the favorites list
   * @param movieId 
   * @returns updated favorites list with movie removed
   */
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.removeFromFavoritesList(this.user.Username, movieId).subscribe((res: any) => {
      this.snackBar.open(`Movie has been removed from favorites`, 'Ok', { duration: 3000 });
      this.ngOnInit();
    });
    return this.getFavMovies();
  }

  /**
   * checks favorites list to see if movie is on it
   * @param _id 
   * @returns true or false depending if _id is found
   */
  isMovieOnFavoritesList(_id: any): any {
    if (this.favorites.includes(_id)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Button allowing user to add and remove movie from favorites list
   * @param movie 
   */
  favoritesButton(movie: any): void {
    this.isMovieOnFavoritesList(movie._id)
      ? this.removeFromFavorites(movie._id)
      : this.addToFavorites(movie._id);
  }
}