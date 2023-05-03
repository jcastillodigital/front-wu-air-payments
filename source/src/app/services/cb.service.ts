import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DomainItem } from '../interfaces/DomainItem';
import { ApiGeneral } from './api.utils';
import { CBObjectMapperService } from './typedocumentmapper.service';

@Injectable({
  providedIn: 'root'
})
export class CBService extends ApiGeneral{

  URL:string = environment.CB.URL;

  constructor(
    http: HttpClient, 
    private cbObjectMapperService: CBObjectMapperService
  ) {
    super(http);
  }

  protected needJwt():boolean {
    return true;
  }

  getData(typeDomain: string):Observable<string> {
    let request:string = this.cbObjectMapperService.buildXMLRequest(typeDomain);
    return super.xmlPost(this.URL, request);
  }

  getDocumentTypes():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.DOCUMENT_TYPE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getGenderTypes():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.GENDER_TYPE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getCountries():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.COUNTRIES).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getDepartments():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.DEPARTMENTS).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getCities():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.CITIES).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getIndicatives():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.INDICATIVES).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getAddressTypes():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.ADDRESS_TYPE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getZones():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.ZONE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getOcupations():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.OCUPATION).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getPositions():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.POSITION_TYPE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getEconomicActivities():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.ECONOMIC_ACTIVITY).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getActivityRange():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.INCOME_RANGE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getDetailOtherIncome():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.DETAIL_OTHER_INCOME).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getExpenseRange():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.EXPENSE_RANGE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getActiveRange():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.ACTIVE_RANGE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getPassiveRange():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.PASSIVE_RANGE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getTransactionalMotive():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.TRANSACTIONAL_MOTIVE).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getTransactionalRelationship():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.TRANSACTIONAL_RELATIONSHIP).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getTypeTransaction():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.TYPE_OPERATION).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

  getROI():Observable<DomainItem[]> {
    return this.getData(environment.CB.DOMAINS.ROI).pipe(map(
      (result) => {
        return this.cbObjectMapperService.transform(result);
      }
    ));
  }

}
