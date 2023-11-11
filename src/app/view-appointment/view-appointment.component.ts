import { Component } from '@angular/core';
import { HttpClientServiceService } from '../Services/http-client-service.service';
import { AppointmentTimeTable } from '../Models/appointment-time-table';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent {

  constructor(private _http : HttpClientServiceService){}

  ngOnInit(){
    this.getScheduledAppointments();
  }

  timeTable : AppointmentTimeTable[] = [];
  getScheduledAppointments(){
    this._http.viewAppointments().subscribe((data) => {
      this.timeTable = data;
    })
  }

  openSlot(i : String){
    alert(i);
  }

}
