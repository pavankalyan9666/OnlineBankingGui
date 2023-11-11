import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../Models/user';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';
import { Debitcard } from '../Models/debitcard';
import { HttpClientServiceService } from '../Services/http-client-service.service';

@Component({
  selector: 'app-debit-or-credit',
  templateUrl: './debit-or-credit.component.html',
  styleUrls: ['./debit-or-credit.component.css']
})
export class DebitOrCreditComponent {

  customerName : String = "CUSTOMER NAME";
  cardNum1 : String = "0400";
  cardNum2 : String = "****";
  cardNum3 : String = "****";
  cardNum4 : String = "----";
  userObject : User = new User();
  debitCard : Debitcard = new Debitcard();
  card : Debitcard = new Debitcard();
  debitCardArray: String[] = [];
  msg : String = "";
  cardLockUnlockFlag : String = ""
  lockSybmolFlag : boolean | undefined ;

  constructor(private dataSharing : DataSharingServiceService,
    private _httpService: HttpClientServiceService){}

  ngOnInit(){
    let userString : string | null = localStorage.getItem("user");
    if(userString !=null){
      this.userObject = JSON.parse(userString);
      this.customerName = this.userObject.firstName?.toUpperCase()+" "+this.userObject.lastName?.toUpperCase();
    }

    this.dataSharing.getDebitCardInfoSubject().subscribe((data) =>{
      this.debitCard = data;
      this.card = this.debitCard;
      this.lockSybmolFlag = (this.debitCard.cardStatus != null)?this.debitCard.cardStatus:false;
      if(this.debitCard){
        if(this.lockSybmolFlag){
          this.msg = "Your Card is in locked state, Unlock it to Use.";
          this.debitCard.cardLockUnlockFlag = "UnLock";
        }else{
          this.msg = "Your Card is in Unlocked state, lock it after Use for safety.";
          this.debitCard.cardLockUnlockFlag = "Lock";
        }
      }
      this.getCardDetails();
      this.SliceAccountNumber(this.debitCard.cardNumber);
      this.getSchedulesCardInfo();
    })
    
  }

  SliceAccountNumber(inputString: String){
    this.debitCardArray = [];
    for (let i = 0; i < inputString.length; i += 4) {
      this.debitCardArray.push(inputString.substring(i, i + 4));
    }

    this.cardNum2 = this.debitCardArray[0];
    this.cardNum3 = this.debitCardArray[1];
    this.cardNum4 = this.debitCardArray[2];
  }
  
  scheduleFlag : String = "";
  dayOfWeek : String = "";
  startTime : String = "";
  stopTime : String = "";
  
  scheduleDebitPopup(){
    this.scheduleFlag = "block";
  }

  closeDebitCardPopup(){
    this.scheduleFlag = "none";
  }

  scheduleDebitCard(){
    if(this.startTime > this.stopTime){
      alert("Start time is After Stop Time !");
    }else{
      this.debitCard.dayOfWeek = this.dayOfWeek;
      this.debitCard.startTime = this.startTime;
      this.debitCard.stopTime = this.stopTime;
      console.log(this.debitCard);
      this._httpService.scheduleDebitCardAutoUnlockFeature(this.debitCard).subscribe((data: String)=>{
        alert(data);
        this.closeDebitCardPopup();
        this.getSchedulesCardInfo();
      });
    }
  }

  schedulesDebitCardDetails : Debitcard[] = [];
  getSchedulesCardInfo(){
    this._httpService.getScheduleDebitCard(this.debitCard.userId,this.debitCard.cardNumber).subscribe((data)=>{
      this.schedulesDebitCardDetails = data;
    })
  }

  getCardDetails(){
    this._httpService.getDebitCard(this.debitCard.userId,this.debitCard.accountNumber).subscribe((data: Debitcard) => {
      this.debitCard = data;
      if(this.debitCard.cardStatus === true){
        this.debitCard.cardLockUnlockFlag = "UnLock"
      }else if(this.debitCard.cardStatus === false){
        this.debitCard.cardLockUnlockFlag = "Lock"
      }
    })
  }

  cardLockUnlock(){
    if(this.lockSybmolFlag){
      this.lockSybmolFlag = false;
      this.card.cardStatus = this.lockSybmolFlag;
      this.updateCardStatus(this.card);
      if(this.cardUpdateResponse == "Success"){
        alert("Card "+this.debitCard.cardNumber+" Got Un Locked Successfully");
      }
    }else{
      this.lockSybmolFlag = true;
      this.card.cardStatus = this.lockSybmolFlag;
      this.updateCardStatus(this.card);
      if(this.cardUpdateResponse == "Success"){
        alert("Card "+this.debitCard.cardNumber+" Got Locked Successfully");
      }
    }
  }

  cardUpdateResponse : String = "";
  updateCardStatus(card : Debitcard){
    this._httpService.updateCardStatus(card).subscribe((data)=>{
      this.cardUpdateResponse = data;
      alert(data);
      if(this.cardUpdateResponse == "Success"){
        alert("Card "+this.debitCard.cardNumber+" Got Un Locked Successfully");
        if(this.lockSybmolFlag){
          this.msg = "Your Card is in locked state, Unlock it to Use.";
          this.debitCard.cardLockUnlockFlag = "UnLock";
        }else{
          this.msg = "Your Card is in Unlocked state, lock it after Use for safety.";
          this.debitCard.cardLockUnlockFlag = "Lock";
        }
    }
    });
  }

  delete(day:String){
    this._httpService.deleteScheduledDebitCard(day,this.debitCard.cardNumber).subscribe((data)=>{
      alert(data);
      this.getSchedulesCardInfo();
    });
  }

}
