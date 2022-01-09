import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent {

  /**
  * Called when creating an instance of the class
  * @param MAT_DIALOG_DATA
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string,
    }
  ) { }

  /**
    * Initializes the component
    * @ignore
    */
  ngOnInit(): void {
  }
}
