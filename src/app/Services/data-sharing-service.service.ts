import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../Models/user';
import { Address } from '../Models/address';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  private openSubject = new Subject<void>(); //login popup
  private flagSubject = new Subject<void>(); // header
  userProfilePicSubject: Subject<any> = new Subject<any>(); // profilePic
  private userInfoSubject = new Subject<any>(); // userInfo
  private debitCardInfoSubject = new Subject<any>();

  constructor() { }

  openNotification(){
    this.openSubject.next();
  }

  getNotification(){
    return this.openSubject.asObservable();
  }

  getFlag(){
    return this.flagSubject;
  }

  getProfilePic(){
    return this.userProfilePicSubject;
  }

  getUserInfoSubject(){
    return this.userInfoSubject;
  }

  getDebitCardInfoSubject(){
    return this.debitCardInfoSubject;
  }

  
}
