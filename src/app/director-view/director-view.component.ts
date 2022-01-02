import { Component, Inject, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string,
    }
  ) { }

  ngOnInit(): void {
  }


  // directors: any[] = [];
  
  // constructor(public fetchApiData: FetchApiDataService,
  //   @Inject(MAT_DIALOG_DATA)
  //   public data: {
  //     name: string,
  //     bio: string,
  //     birth: string,
  //     death: string,
  //   }
  // ) { }

  // ngOnInit(): void {
  //   this.getDirector();
  // }

  // //gets information on director
  // getDirector(): void {
  //   this.fetchApiData.getDirector(this.directors).subscribe((res: any) => {
  //     this.directors = res;
  //     // console.log(this.directors);
  //     return this.directors;
  //   });
  // }
}
