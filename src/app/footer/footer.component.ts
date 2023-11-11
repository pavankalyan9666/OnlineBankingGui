import { Component } from '@angular/core';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  ngOnInit(){
    this.dataSharing.getFlag().subscribe(() => {
      this.flag = true;
    })
  }

  constructor(private dataSharing : DataSharingServiceService){}

  flag : boolean = false;

}
