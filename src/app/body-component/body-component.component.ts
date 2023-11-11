import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientServiceService } from '../Services/http-client-service.service';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';
import { ResponseObject } from '../Models/response-object';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';

@Component({
  selector: 'app-body-component',
  templateUrl: './body-component.component.html',
  styleUrls: ['./body-component.component.css']
})
export class BodyComponentComponent implements OnInit{
  
  sanitizer: any;
  imageSrc: string | ArrayBuffer | undefined;
  public loginId: String = "";
  public userName: String = "";
  public password: String = "";
  responseObj : ResponseObject | undefined ;

  ngOnInit() {
    this.dataSharing.getNotification().subscribe(() => {
      this.login();
    })
  }
  
  constructor(private _router: Router,
    private _httpService: HttpClientServiceService,
    private dataSharing: DataSharingServiceService) {

  }

  createAccount() {
    this._router.navigate(["/registration"]);
    // this._httpService.sample().subscribe((data: any)=>{
    //   console.log(data);
    // }
  }

  login() {
    this.loginId = "block";
  }

  close() {
    this.loginId = "none";
  }
  
  userObject : User = new User();

  userLogin() {
    if (this.userName == "") {
      alert("UserName Empty");
    } else {
      this.getUserActualLogic();
      this.loginId = "none";
    }
  }

  getUserActualLogic(){
    this._httpService.login(this.userName,this.password).subscribe((data:any)=>{
      this.responseObj = data;
      if(this.responseObj != undefined){
        if(this.responseObj.responseMessage == "SUCCESS"){
          this.userObject = this.responseObj.user;
          this.dataSharing.getFlag().next();
          localStorage.setItem("user",JSON.stringify(this.userObject));
          this._router.navigate(["/userAfterLogin"]);
        }else{
          alert(this.responseObj.responseMessage);
        }
      }
    });
  }

  bookAppointment(){
    this._router.navigate(["/bookAppointment"]);
  }

  viewAppointment(){
    this._router.navigate(["/viewAppointment"]);
  }

  forgotPassword :String = "";
  userNameForgot : String = "";
  forgotPasswordMethod(){
    this.loginId = "none";
    this.forgotPassword = "block";
  }
  close1(){
    this.forgotPassword = "none";
  }

  remainderPassword(){
    this._httpService.forgotPassword(this.userNameForgot).subscribe((data) =>{
      if(data){
        alert("You will be received your Password to your Registered Email. Please Check..");
      }else{
        alert("Invalid User. UserId Not Found");
      }
      this.forgotPassword = "none";
    });
  }

}
