import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {
  genre: any = [];
  constructor(public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getGenre();
  }

  getGenre(): void {
    this.fetchApiData.getGenre(this.genre.name).subscribe((res: any) => {
      this.genre = res.genere;
      console.log(this.genre);
      return this.genre;
    });
  }
}
