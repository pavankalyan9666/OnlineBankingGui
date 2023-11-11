import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HEALTH_CHECK, LOGIN_API } from '../Constants/constants';
import { User } from '../Models/user';
import { ResponseObject } from '../Models/response-object';
import { Account } from '../Models/account';
import { Transactions } from '../Models/transactions';
import { Address } from '../Models/address';
import { Registration } from '../Models/registration';
import { Debitcard } from '../Models/debitcard';
import { AmountTransfer } from '../Models/amount-transfer';
import { Appointment } from '../Models/appointment';
import { AppointmentTimeTable } from '../Models/appointment-time-table';
import { AutoPayApps } from '../Models/auto-pay-apps';

@Injectable({
  providedIn: 'root'
})
export class HttpClientServiceService {

  constructor(private httpClient:HttpClient){ }

  imageSrc: string | ArrayBuffer | undefined;

  host: string = "http://localhost:8080";

  sample(){
    return this.httpClient.get(HEALTH_CHECK,{responseType: 'text'});
  }

  login(userId : String, password : String ):Observable<ResponseObject>{
    var loginApi = LOGIN_API+"?userId="+userId+"&password="+password;
    return this.httpClient.get<ResponseObject>(loginApi);
  }

  getImageee(userName : String, password : String) : any{
    return this.httpClient
      .get("http://localhost:8080/profilePic?userId="+userName+"&password="+password, { responseType: 'arraybuffer', });
  }

  uploadProfile(userName : String, password : String,selectedFile: File) : any{
    const formData = new FormData();
    formData.append('file', selectedFile);
    return this.httpClient.post('http://localhost:8080/upload?userId='+userName+"&password="+password, formData , {responseType: 'text'});
  }

  getUserAccountInfo(userId : String) : Observable<Account>{
    return this.httpClient.get<Account>("http://localhost:8080/getUserAccountInfo?userId="+userId);
  }

  getUserTransactions(userId : String) : Observable<Transactions[]>{
    return this.httpClient.get<Transactions[]>("http://localhost:8080/getUserTransactionInfo?userId="+userId);
  }

  userRegistration(registration : Registration){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post("http://localhost:8080/userRegistration",registration,{ responseType: 'text' });
  }

  saveUserInfo(userObj : User):any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post("http://localhost:8080/updateUserInfo",userObj);
  }

  updateCardStatus(debitCard:Debitcard){
    return this.httpClient.post("http://localhost:8080/updateCardStatus",debitCard,{ responseType: 'text' });
  }
  getDebitCard(userId : String , accountNumber : String) : any{
    return this.httpClient.get("http://localhost:8080/getDebitCard?userId="+userId+"&accountNumber="+accountNumber);
  }

  scheduleDebitCardAutoUnlockFeature(debitCard:Debitcard){
    return this.httpClient.post("http://localhost:8080/scheduleDebitCard",debitCard,{ responseType: 'text' });
  }

  getScheduleDebitCard(userId : String , cardNumber : String):Observable<Debitcard[]>{
    return this.httpClient.get<Debitcard[]>("http://localhost:8080/getScheduleDebitCard?userId="+userId+"&cardNumber="+cardNumber);
  }

  deleteScheduledDebitCard(day : String, cardNumber : String){
    return this.httpClient.delete("http://localhost:8080/deleteCardSchedule?scheduledDay="+day+"&cardNumber="+cardNumber,{ responseType: 'text' });
  }

  getUserContactInfoForZelle(){
    return this.httpClient.get<User[]>("http://localhost:8080/getAllUsers");
  }

  zelleTransaction(zelleTransaction : AmountTransfer){
    return this.httpClient.post("http://localhost:8080/zelleTransaction",zelleTransaction,{ responseType: 'text' });
  }

  bookAppointment(appointment : Appointment){
    return this.httpClient.post("http://localhost:8080/bookAppointment",appointment,{ responseType: 'text' });
  }

  viewAppointments(){
    return this.httpClient.get<AppointmentTimeTable[]>("http://localhost:8080/viewAppointment");
  }

  getUserAddress(userId : String){
    return this.httpClient.get<Address>("http://localhost:8080/getUserAddress?userId="+userId);
  }

  forgotPassword(userId : String){
    return this.httpClient.get<boolean>("http://localhost:8080/forgotPassword?userName="+userId);
  }

  getAutoPay(userId : String){
    return this.httpClient.get("http://localhost:8080/getAutoPay?userId="+userId);
  }

  updateAutoPayApps(appPay : AutoPayApps){
    return this.httpClient.post("http://localhost:8080/updateAutopay",appPay,{ responseType: 'text' });
  }
}
