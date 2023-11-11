import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponentComponent } from './body-component/body-component.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserAfterLoginComponent } from './user-after-login/user-after-login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientServiceService } from './Services/http-client-service.service';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { DataSharingServiceService } from './Services/data-sharing-service.service';
import { BodyCarousalEffectComponent } from './body-carousal-effect/body-carousal-effect.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AccountTypesComponent } from './account-types/account-types.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { DebitOrCreditComponent } from './debit-or-credit/debit-or-credit.component';
import { SecurityAuthenticationGuard } from './security-authentication.guard';
import { ViewAppointmentComponent } from './view-appointment/view-appointment.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BodyComponentComponent,
    CreateAccountComponent,
    UserAfterLoginComponent,
    RegistrationComponent,
    BodyCarousalEffectComponent,
    ChatbotComponent,
    ContactsComponent,
    AccountTypesComponent,
    BookAppointmentComponent,
    DebitOrCreditComponent,
    ViewAppointmentComponent,
    ForgotPasswordComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // ChartsModule
  ],
  providers: [HttpClientServiceService,DataSharingServiceService,SecurityAuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
