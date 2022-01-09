import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

  /**
   * Called when creating an instance of the class
   * @param MAT_DIALOG_DATA
   * Injects data to be read
   * @param Name is the name of the directer
   * @param Bio is for a small bio of the director
   * @param Birth is for the director's birthday
   * @param Death is for the director's death if applicable
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string,
    }
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }
}
