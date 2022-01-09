import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent {

  /**
   * Called when creating an instance of the class
   * @param MAT_DIALOG_DATA
   * Injects the data for the genre infor
   * @param Name is for the genre name
   * @param Description is for a description of the genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }
}
