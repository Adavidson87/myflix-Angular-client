import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

  // genre: any = [];
  // constructor(public fetchApiData: FetchApiDataService,
  // ) { }

  // ngOnInit(): void {
  //   this.getGenre(this.genre);
  // }

  // //gets information on genres
  // getGenre(Name: any): void {
  //   this.fetchApiData.getGenre(Name).subscribe((res: any) => {
  //     this.genre = res.genre;
  //     console.log(this.genre);
  //     return this.genre;
  //   });
  // }
}
