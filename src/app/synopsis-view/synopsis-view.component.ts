import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string,
    }
  ) { }

  ngOnInit(): void {
  }
}
