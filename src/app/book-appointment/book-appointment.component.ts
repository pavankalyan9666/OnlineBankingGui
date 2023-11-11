import { Component } from '@angular/core';
import { Appointment } from '../Models/appointment';
import { HttpClientServiceService } from '../Services/http-client-service.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {

  fullName!: String;
  phoneNumber!: String;
  email!: String;
  date! : String;
  time! : String;
  locality! : String;
  city! : String;
  state! : String;
  pinCode! : String;
  appointment : Appointment = new Appointment();

  constructor(private _httpService: HttpClientServiceService){}

  bookAppointment(){ 
    this.appointment.fullName = this.fullName;
    this.appointment.phoneNumber = this.phoneNumber;
    this.appointment.email = this.email;
    this.appointment.date = this.date;
    this.appointment.time = this.time;
    this.appointment.locality = this.locality;
    this.appointment.city = this.city;
    this.appointment.state = this.state;
    this.appointment.pinCode = this.pinCode;

    console.log(this.appointment);
    this._httpService.bookAppointment(this.appointment).subscribe((data) => {
      alert(data);
    })
  }
}
