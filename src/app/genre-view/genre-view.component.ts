import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {
  genre: any[]=[];
  constructor(public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getGenre();
  }

  getGenre(): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      this.genre = resp;
      console.log(this.genre);
      return this.genre;
    });
  }
}
