import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflix-cryptic-waters.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // endpoint for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // endpoint for showing movie list
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // endpoint for showing a single movie
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // endpoint for showing director details
  public getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'director/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // endpiont for showing genre details
  public getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genre/:Name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // endpoing for showing user details
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/:username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // endpoint for view user's favorite list
  public viewFavortiesList(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/users/:username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // adding a movie to user's favorite list
  public addToFavoritesList(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `/users/:username/movies/:_id`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // editing user details
  public editUserDetails(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + '/users/:username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // deleting a user
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:username', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // removing a movie from favorites list
  public removeFromFavoritesList(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + '/users/:username/movies/:_id', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer' + token,
        })
    }).pipe(
      // map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}