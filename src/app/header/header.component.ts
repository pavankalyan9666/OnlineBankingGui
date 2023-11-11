import { Component } from '@angular/core';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  ngOnInit() {
    this.dataSharing.getFlag().subscribe(() => {
      this.flag = true;
    });
    this.dataSharing.getProfilePic().subscribe((data) => {
      this.getProfilePic(data);
    });
  }

  constructor(private dataSharing: DataSharingServiceService, private _router: Router) { }

  flag: boolean = false;
  imageSrcFlag1: boolean = false;
  imageSrcFlag2: boolean = false;
  imageSrc: string | ArrayBuffer | undefined;

  login() {
    this.dataSharing.openNotification();
  }

  logout() {
    localStorage.clear();
    this._router.navigate(["home"]);
  }

  getProfilePic(data: any) {
    this.imageSrc = data;
    if (this.flag == true) {
      if (this.imageSrc === "data:application/octet-stream;base64,") {
        this.imageSrcFlag1 = true;
        this.imageSrcFlag2 = false;
      } else {
        this.imageSrcFlag1 = false;
        this.imageSrcFlag2 = true;
      }
    }
  }
}
