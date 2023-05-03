import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Test } from '../interfaces/Test';

@Injectable()
export class ClientService extends ApiService<Test,number>{

  URL:string = "test";//environment.API_AUTH;

  constructor(http:HttpClient) {
    super(http);
  }


  protected needJwt():boolean {
    return true;
  }

  protected getENDPOINT(): string {
    return this.URL;
  }

}
