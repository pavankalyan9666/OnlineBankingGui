import { Component } from '@angular/core';
import { User } from '../Models/user';
import { Address } from '../Models/address';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';
import { HttpClientServiceService } from '../Services/http-client-service.service';
import { Registration } from '../Models/registration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{
  
  // User Obj Data Variables
	firstName:String | undefined;
  mobile:String | undefined;
  gender : String | undefined;
  citizen : String | undefined;
  password!: String;
	lastName:String | undefined;
  dob : String = "";
  maritialStatus : String | undefined;
	email:String | undefined;
	age:number | undefined;
  confirmPassword!: String;
	// profilePic: Blob | undefined;

  // Address Obj  Data VAriabes
  userId : String | undefined;
	street : String | undefined;
	building : String | undefined;
	state : String | undefined;
	country : String | undefined;
	pincode : String | undefined;
  landMark : String | undefined;

  user!: User;
  address!: Address;
  registration = new Registration();
  
	constructor(private _router : Router,
    private dataSharing: DataSharingServiceService,
    private _httpService: HttpClientServiceService){
  }
  personalValidation(one : String, two : String){
    if(one == "step1" && two == "step2"){
      var errorMsg : any;
      errorMsg = this.validateUserDetails();
      (errorMsg.length == 0)?this.nextStep('step1', 'step2'):alert(errorMsg);
    }else if(one == "step2" && two == "step3"){
      var errorMsg : any;
      errorMsg = this.validateAddressDetails();
      (errorMsg.length == 0)?this.submitForm():alert(errorMsg);
    }
  }

  submitForm(){
    this.user = new User();
    this.address = new Address();
    this.registration = new Registration();

    this.user.firstName = this.firstName;
    this.user.mobile = this.mobile;
    this.user.gender = this.gender;
    this.user.citizen = this.citizen;
    this.user.password = this.password;
    this.user.lastName = this.lastName;
    this.user.dob = this.dob;
    this.user.maritialStatus = this.maritialStatus;
    this.user.email = this.email;
    this.user.firstName = this.firstName;
    this.user.age = this.calculateAge(this.dob.split("-")[0]);
    this.user.userId = this.firstName?.charAt(0).concat(this.lastName+"")+"";

    this.address.userId = this.user.userId;
	  this.address.street = this.street;
	  this.address.building = this.building;
	  this.address.state = this.state;
	  this.address.country = this.country;
	  this.address.pincode = this.pincode;
    this.address.landMark = this.landMark;

    this.registration.user = this.user;
    this.registration.address = this.address;
    this._httpService.userRegistration(this.registration).subscribe((data)=>{
      alert(data);
      this._router.navigate(['/home']);
    });
  }

  calculateAge(year: String) {
    var ageDifMs = Date.now();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - Number(year));
  }

  validateUserDetails() : Array<string>{
    let errorMsg = new Array<string>;
    !(this.firstName != null && this.firstName != undefined && this.firstName != "")? errorMsg.push("Please Check FirstName"):"";
    !(this.lastName != null && this.lastName != undefined && this.lastName != "")? errorMsg.push("\nPlease Check LastName"):"";
    !(this.mobile != null && this.mobile != undefined && this.mobile != "")? errorMsg.push("\nPlease Check Mobile"):"";
    !(this.gender != null && this.gender != undefined && this.gender != "")? errorMsg.push("\nPlease Check gender"):"";
    !(this.citizen != null && this.citizen != undefined && this.citizen != "")? errorMsg.push("\nPlease Check citizen"):"";
    !(this.password != null && this.password != undefined && this.password != "")? errorMsg.push("\nPlease Check password"):"";
    !(this.maritialStatus != null && this.maritialStatus != undefined && this.maritialStatus != "")? errorMsg.push("\nPlease Check maritalStatus"):"";
    !(this.email != null && this.email != undefined && this.email != "")? errorMsg.push("\nPlease Check Email"):"";
    !(this.confirmPassword != null && this.confirmPassword != undefined && this.confirmPassword != "")? errorMsg.push("\nPlease Check Confirm Password"):"";
    return errorMsg;
  }

  validateAddressDetails() : Array<string>{
    let errorMsg = new Array<string>;
    !(this.street != null && this.street != undefined && this.street != "")? errorMsg.push("Please Check Street"):"";
    !(this.landMark != null && this.landMark != undefined && this.landMark != "")? errorMsg.push("\nPlease Check Landma"):"";
    !(this.state != null && this.state != undefined && this.state != "")? errorMsg.push("\nPlease Check State"):"";
    !(this.building != null && this.building != undefined && this.building != "")? errorMsg.push("\nPlease Check Building No"):"";
    !(this.country != null && this.country != undefined && this.country != "")? errorMsg.push("\nPlease Check Country"):"";
    !(this.pincode != null && this.pincode != undefined && this.pincode != "")? errorMsg.push("\nPlease Check PinCode"):"";
    return errorMsg;
  }

  currentStep: number = 1;

  nextStep(currentStepId: string, nextStepId: string): void {
      document.getElementById(currentStepId)?.classList.remove('active');
      document.getElementById(nextStepId)?.classList.add('active');
      this.currentStep++;
  }

  prevStep(currentStepId: string, prevStepId: string): void {
      document.getElementById(currentStepId)?.classList.remove('active');
      document.getElementById(prevStepId)?.classList.add('active');
      this.currentStep--;
  }
}

