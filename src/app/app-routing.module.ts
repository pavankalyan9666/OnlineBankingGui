import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { UserAfterLoginComponent } from './user-after-login/user-after-login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BodyCarousalEffectComponent } from './body-carousal-effect/body-carousal-effect.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AccountTypesComponent } from './account-types/account-types.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { SecurityAuthenticationGuard } from './security-authentication.guard';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';

const routes: Routes = [
  {path:"",component:BodyComponentComponent},
  {path:"home",component:BodyComponentComponent},
  {path:"create",component:CreateAccountComponent},
  {path:"userAfterLogin",component:UserAfterLoginComponent,
    canActivate:[SecurityAuthenticationGuard]
  },
  {path:"registration", component:RegistrationComponent},
  {path:"carousal",component:BodyCarousalEffectComponent},
  {path:"contacts",component:ContactsComponent},
  {path:"accountTypes",component:AccountTypesComponent},
  {path:"bookAppointment", component:BookAppointmentComponent},
  {path:"viewAppointment",component:ViewAppointmentComponent}
  
  // {path:"adminAfterLogin/:id",component:AdminafterloginComponent},
  // {path:"driverAfterLogin/:id",component:DriverafterloginComponent},
  // {path:"userAfterLogin/:id",component:UserafterloginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
