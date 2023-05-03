import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiGeneral } from './api.utils';
import { CBObjectMapperService } from './typedocumentmapper.service';
import { VoucherRequest } from '../interfaces/VoucherRequest';

@Injectable({
  providedIn: 'root'
})
export class VoucherService extends ApiGeneral{

  URL:string = environment.VOUCHER.URL;

  constructor(
    http: HttpClient, 
    private cbObjectMapperService: CBObjectMapperService
  ) {
    super(http);
  }

  protected needJwt():boolean {
    return true;
  }

  public getVoucher(request: VoucherRequest):Observable<Blob> {
    return super.getPdf(this.URL, request);
  }

  public async downloadAsFile(request: VoucherRequest): Promise<Blob | undefined> {
    const file:any = await this.getVoucher(request).toPromise();
    const url = window.URL.createObjectURL(file);
    window.open(url,"_blank")
    return file;
  }


}
