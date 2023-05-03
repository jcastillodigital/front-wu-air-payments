import { Injectable } from '@angular/core';
import { ApiGeneral } from './api.utils';
import { VoucherMapperService } from './vouchermapper.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FindPaymentRequest } from '../interfaces/FindPaymentRequest';
import { AuthResponse } from '../interfaces/AuthResponse';
import { Observable, map } from 'rxjs';
import { MoneyTransferPayMapperService } from './moneytransferpaymapper.service';
import { VoucherRequest } from '../interfaces/VoucherRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentConfirmService extends ApiGeneral {

   URL:string = environment.PAYMENT.FIND.URL;

  constructor(http: HttpClient, 
    private moneyTransferPayMapperService: MoneyTransferPayMapperService, 
    private voucherMapperService: VoucherMapperService
    ) {
    super(http);
  }

  protected needJwt():boolean {
    return true;
  }

  confirmData(request:FindPaymentRequest  | null | undefined, authData: AuthResponse | null | undefined, data: any): Observable<string> {
    let str_request:string = this.moneyTransferPayMapperService.requestStep2(request, authData, data);
    return super.xmlPost(this.URL, str_request);
  }

  confirmMoneyTransfer(request:FindPaymentRequest | null | undefined, authData: AuthResponse | null | undefined, data: any): Observable<VoucherRequest> {
    return this.confirmData(request, authData, data).pipe(map(
      (result) => {
        localStorage.setItem("step2",result);
        return this.voucherMapperService.xmlToDto(result);
      }
    ));
  }

}
