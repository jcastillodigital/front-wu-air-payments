import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TemplateModule } from '../template/template.module';
import { PaymentMainComponent } from './components/payment-main/payment-main.component';
import { CreatePaymentFormComponent } from './components/create-payment-form/create-payment-form.component';
import { FindPaymentFormComponent } from './components/find-payment-form/find-payment-form.component';

@NgModule({
  declarations: [
    PaymentMainComponent,
    FindPaymentFormComponent,
    CreatePaymentFormComponent
  ],
  exports: [
    PaymentMainComponent,
    FindPaymentFormComponent,
    CreatePaymentFormComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TemplateModule
  ]
})
export class PaymentModule { }
