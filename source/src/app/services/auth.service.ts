import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../interfaces/AuthRequest';
import { AuthResponse } from '../interfaces/AuthResponse';
import { ApiGeneral } from './api.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiGeneral{

  URL:string = environment.JWT.URL;

  constructor(http: HttpClient) {
    super(http);
  }

  protected needJwt():boolean {
    return false;
  }

  login(param1:any, param2: any):Observable<AuthResponse> {
    let auth:AuthRequest = {
      url: param1, 
      agent: param2
    };
    return super.post(this.URL, auth);
  }
}
