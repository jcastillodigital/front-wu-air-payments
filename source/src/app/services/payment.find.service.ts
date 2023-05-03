import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/AuthResponse';
import { FindPaymentRequest } from '../interfaces/FindPaymentRequest';
import { MoneyTransferPayFind } from '../interfaces/MoneyTransferFind';
import { ApiGeneral } from './api.utils';
import { MoneyTransferPayMapperService } from './moneytransferpaymapper.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentFindService extends ApiGeneral {

  URL:string = environment.PAYMENT.FIND.URL;

  constructor(http: HttpClient, 
    private moneyTransferPayMapperService: MoneyTransferPayMapperService
    ) {
    super(http);
  }

  protected needJwt():boolean {
    return true;
  }

  getData(request:FindPaymentRequest, authData: AuthResponse | null | undefined): Observable<string> {
    let str_request:string = this.moneyTransferPayMapperService.requestStep1(request,authData);
    return super.xmlPost(this.URL, str_request);
  }

  getMoneyTransfer(request:FindPaymentRequest, authData: AuthResponse | null | undefined): Observable<MoneyTransferPayFind> {
    return this.getData(request,authData).pipe(map(
      (result) => {
        localStorage.setItem("step1",result);
        return this.moneyTransferPayMapperService.xmlToDto(result);
      }
    ));
  }

}
