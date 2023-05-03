import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TemplateModule } from './modules/template/template.module';
import { ClientService } from './services/client.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { PaymentModule } from './modules/payment/payment.module';
import { CBObjectMapperService } from './services/typedocumentmapper.service';
import { MoneyTransferPayMapperService } from './services/moneytransferpaymapper.service';
import { VoucherService } from './services/voucher.service';
import { DeactivateGuard } from './guards/DeactivateGuard';
import { VoucherMapperService } from './services/vouchermapper.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule, FormsModule, BrowserModule, HttpClientModule, AppRoutingModule, TemplateModule, PaymentModule
  ],
  providers: [
    AuthService, ClientService, AlertService, CBObjectMapperService, VoucherMapperService, MoneyTransferPayMapperService, VoucherService, DeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
