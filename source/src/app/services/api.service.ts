import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiGeneral } from '../services/api.utils';
import { RequestServerResponse } from '../interfaces/RequestServerResponse';

@Injectable()
export abstract class ApiService<I,ID> extends ApiGeneral{

  constructor(http: HttpClient) {
    super(http);
  }

  protected abstract getENDPOINT():string;

  public findAll(search:string = '', page:number = 1): Observable<RequestServerResponse<I[]> | any>{
    return super.get(this.getENDPOINT() + "?search=" + search+"&p="+page);
  }

  public findOne(id:ID):Observable<RequestServerResponse<I> | any>{
    return super.get(this.getENDPOINT()+"/"+id);
  }

  public create(data:I): Observable<RequestServerResponse<any> | any>{
    return super.post(this.getENDPOINT(),data);
  }

  public edit(data:I,id:ID): Observable<RequestServerResponse<I> | any>{
    return super.put(this.getENDPOINT()+"/"+id,data);
  }

  public destroy(id:ID):Observable<RequestServerResponse<ID> | any>{
    return super.delete(this.getENDPOINT()+"/"+id,);
  }
}
