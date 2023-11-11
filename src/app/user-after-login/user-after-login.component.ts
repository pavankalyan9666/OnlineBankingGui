import { Component, OnInit } from '@angular/core';
import { DataSharingServiceService } from '../Services/data-sharing-service.service';
import { HttpClientServiceService } from '../Services/http-client-service.service';
import { User } from '../Models/user';
import { Account } from '../Models/account';
import { Transactions } from '../Models/transactions';
import { Debitcard } from '../Models/debitcard';
import { AmountTransfer } from '../Models/amount-transfer';
import { Address } from '../Models/address';
import { AutoPayApps } from '../Models/auto-pay-apps';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-user-after-login',
  templateUrl: './user-after-login.component.html',
  styleUrls: ['./user-after-login.component.css']
})
export class UserAfterLoginComponent implements OnInit{

  tabFlag : any;
  profilePic : String | undefined;
  selectedFile: File | null = null;
  imageSrc: string | ArrayBuffer | undefined;
  imageSrcSel: string | ArrayBuffer | undefined;
  userObj : any;
  receivedData: any;
  responseObj: any;
  userName : String = "";
  password : String = "";
  userString : String | null = "";
  toggle : boolean = false;

  userObject : User = new User();
  userObjectTemp : User = new User();
  userAccountObj : Account = new Account();
  userAddressObj : Address = new Address();
  transactionObject: Transactions[] = [];
  userTransactionData: Transactions[] = [];
  receiverTransactionData: Transactions[] = [];
  receiverZelleTransaction: Transactions[] = [];
  userZelleTransaction: Transactions[] = [];

  imageSrcFlag1 : boolean = false;
  imageSrcFlag2 : boolean = true;
  imageSrcFlag3 : boolean = false;
  imageSrcFlag4 : boolean = true;
  dob : String = "";
  zelleContacts: User[] = [];
  // zelleContactsFiltered: User[] = [];
  search : string = "";
  contacts: string[] = [];
  contactsCopy: string[] = [];
  defaultFlag : boolean = true;
  debitCard: Debitcard = new Debitcard;

  constructor(private dataSharing: DataSharingServiceService,
    private _httpService: HttpClientServiceService){
  }

  ngOnInit(){
    this.tabFlag = "block";
    this.defaultFlag = true;
    let userString : string | null = localStorage.getItem("user");
    if(userString !=null){
      try {
        this.userObject = JSON.parse(userString);
        this.userObjectTemp = this.userObject;
      } catch (e) {
        console.error('Error parsing user data from local storage:', e);
      }
    }
    this.getProfilePic();
    this.getUserAccountInfo();
    this.getUserAccountTransactions(this.userObject);
    this.getUserAddress(this.userObject.userId);
    this.getAutoPay(this.userObject.userId);
    this.getUserContactInfoForZelle();
    this.dataSharing.getFlag().next();
  }

  tabOpen(){
    this.tabFlag = "none";
  }
  tabHome(){
    this.tabFlag = "block";
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  openPage(pageName: string){
    let i: number;
    let tabcontent: HTMLCollectionOf<HTMLElement>;
    let tablinks: HTMLCollectionOf<HTMLElement>;
    this.defaultFlag = false;
    tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink") as HTMLCollectionOf<HTMLElement>;
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
      selectedPage.style.display = "block";
    }
  }

  getUserAddress(userId : String){
    this._httpService.getUserAddress(userId).subscribe((data) => {
      this.userAddressObj = data;
    })
  }

  SubmitProfilePic() {
    if (!this.selectedFile) {
      alert('No file selected.');
      return;
    }
    this._httpService.uploadProfile(this.userObject.userId,this.userObject.password,this.selectedFile).subscribe((response : any) => {
      this.getProfilePic();
    });
  }

  getProfilePic(){
    this._httpService.getImageee(this.userObject.userId,this.userObject.password).subscribe((data : any)=>{
      const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result ?? '';
          this.dataSharing.getProfilePic().next(this.imageSrc);
          if(this.imageSrc === "data:application/octet-stream;base64,"){
            this.imageSrcFlag2 = true;
            this.imageSrcFlag1 = false;
          }else{
            this.imageSrcFlag2 = false;
            this.imageSrcFlag1 = true;
          }
        };
        reader.readAsDataURL(new Blob([data]));
    })
  }

  getUserAccountInfo(){
    this._httpService.getUserAccountInfo(this.userObject.userId).subscribe((data) => {
      this.userAccountObj = data;
      this.getDebitCard();
    })
  }

  getUserAccountTransactions(user : User){
    this._httpService.getUserTransactions(user.userId).subscribe((data)=>{
      this.transactionObject = data;
      this.userTransactionData = this.transactionObject;
    });
  }

  getDebitCard(){
    this._httpService.getDebitCard(this.userObject.userId,this.userAccountObj.accountNumber).subscribe((data: Debitcard) =>{
      this.debitCard = data;
      this.dataSharing.getDebitCardInfoSubject().next(this.debitCard);
    });
  }

  saveUserInfo(){
    this.dob = this.userObject.dob+"";
    this.userObject.age = this.calculateAge(this.dob.split("-")[0]);
    this.userObject.profilePic = undefined;
    console.log(this.userObject);
    this._httpService.saveUserInfo(this.userObject).subscribe((data : String) => {
      console.log(data);
    });
  }

  calculateAge(year: String) {
    var ageDifMs = Date.now();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - Number(year));
  }

  getUserContactInfoForZelle(){
    this._httpService.getUserContactInfoForZelle().subscribe((data)=>{
      this.zelleContacts = data;
      // this.zelleContactsFiltered = this.zelleContacts;
      this.loadContacts();
    })
  }

  private allUserDetails : Map<String , User> = new Map();
  loadContacts(){
    this.zelleContacts.forEach(it => {
      if(it.mobile != null){
        var key = it.mobile+" "+it.firstName+" "+it.lastName+"";
        this.contacts.push(key);
        this.allUserDetails.set(key , it);
        // this.contactsCopy.push(it.mobile+" "+it.firstName+" "+it.lastName+"");
      }
    })
    // console.log(this.contacts);
  }

  binarySearch(query: string): string[] {
    const results: string[] = [];
    const queryLC = query.toLowerCase();
    let left = 0;
    let right = this.contacts.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const name = this.contacts[mid].toLowerCase();
      if (name.includes(queryLC)) {
        results.push(this.contacts[mid]);
      }
      if (name < queryLC) {
        left = mid + 1;
      }else {
        right = mid - 1;
      }
    }
    return results;
  }

  onKeyUp() {
    this.zelleFlag = false;
    if(this.search == ""){
      this.contactsCopy = [];
    }else{
      this.contactsCopy = this.contacts.filter(item =>
        item.toLowerCase().includes(this.search.toLowerCase())
      );
    } 
  }

  zelleFlag : boolean = false;
  selectedUser : User = new User();

  select(i: string) {
    this.search = i;
    this.contactsCopy = [];
    this.transactionList = [];
    const user = this.allUserDetails.get(i);
    if (user) {

      this.selectedUser = user;
      this.zelleFlag = true;

      this._httpService.getImageee(this.selectedUser.userId,this.selectedUser.password).subscribe((data : any)=>{
        const reader = new FileReader();
          reader.onload = () => {
            this.imageSrcSel = reader.result ?? '';
            if(this.imageSrcSel === "data:application/octet-stream;base64,"){
              this.imageSrcFlag4 = true;
              this.imageSrcFlag3 = false;
            }else{
              this.imageSrcFlag4 = false;
              this.imageSrcFlag3 = true;
            }
          };
          reader.readAsDataURL(new Blob([data]));
      });

      this.userZelleTransaction = this.userTransactionData.filter(i => 
        (i.receiver == this.selectedUser.userId && i.sender == this.userObject.userId && i.transactionType == "DEBIT") ||
        (i.receiver == this.userObject.userId && i.sender == this.selectedUser.userId && i.transactionType == "CREDIT")
      );

      this.loadTransactions(this.userZelleTransaction);

      this._httpService.getUserTransactions(this.selectedUser.userId).subscribe((data)=>{
        this.receiverTransactionData = data;
        this.receiverZelleTransaction = this.receiverTransactionData.filter(i => 
          (i.receiver == this.userObject.userId && i.sender == this.selectedUser.userId && i.transactionType == "DEBIT")
        );
        this.loadTransactions(this.receiverZelleTransaction);
        console.log(this.transactionList);
      });
    } else {
      alert("User Not Exists in Zelle");
    }

  }

  transactionList: Array<{ id:number , amount: string, flag: string }> = [];
  loadTransactions(transaction : Transactions[]){
    transaction.forEach(it => {
       this.transactionList.push({ id : it.transactionId, amount : it.amountTransfer+"", flag : (it.sender == this.userObject.userId)?'sender':"receiver"});
    });
    console.log(this.transactionList);
    console.log(this.transactionList.sort((a, b) => a.id - b.id));
  }

  msg :string = "";
  msgFlag : boolean = true;

  zelAmount!: number;
  zelObject : AmountTransfer = new AmountTransfer();

  sendButton(){
    var zamount = this.zelAmount;
    this.zelObject.sender = this.userObject;
    this.zelObject.receiver = this.selectedUser;
    this.zelObject.zelAmount = zamount;
    this._httpService.zelleTransaction(this.zelObject).subscribe((data) => {
      alert(data);
      if(data == "Transaction Success"){
        this.getUserAccountTransactions(this.userObject);
        this.transactionList.push({ id : 0, amount : this.zelAmount+"", flag : "sender"});
      }
    });
  }

  netflix!: boolean;
  prime!: boolean;
  hulu!: boolean;
  appleTv!: boolean;
  disneyStar!: boolean;
  youtubeTv!: boolean;

  autoPay : AutoPayApps = new AutoPayApps();

  getAutoPay(userId : String){
    this._httpService.getAutoPay(userId).subscribe((data : any) => {
      this.autoPay = data;
      this.netflix = this.autoPay.netflix;
      this.prime = this.autoPay.prime;
      this.hulu = this.autoPay.hulu;
      this.appleTv = this.autoPay.appleTv;
      this.disneyStar = this.autoPay.disneyStar;
      this.youtubeTv = this.autoPay.youtubeTv;
    })
  }

  saveAutoPay(){
    this.autoPay.netflix = this.netflix;
    this.autoPay.prime = this.prime;
    this.autoPay.hulu = this.hulu;
    this.autoPay.appleTv = this.appleTv;
    this.autoPay.disneyStar = this.disneyStar;
    this.autoPay.youtubeTv = this.youtubeTv;

    this._httpService.updateAutoPayApps(this.autoPay).subscribe((data) => {
      alert(data);
    })
  }

  to_account : String = "";
  transferMoney(){
    if(this.userAccountObj.accountNumber == this.to_account){
      alert(" Both Account Numbers are same ");
    }
  }

  public chartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];

  public chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartOptions = {
    responsive: true,
  };

  public chartType = 'bar';

}