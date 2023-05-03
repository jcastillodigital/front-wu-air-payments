import { throwError, pipe, Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestServerResponse } from '../interfaces/RequestServerResponse';


export abstract class ApiGeneral {

    protected abstract needJwt():boolean;

    //protected abstract getContentType() : string;

    constructor(protected http: HttpClient) { }
    
    private handleError(error: HttpErrorResponse) {
        console.log(error);

        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
          return throwError(() => new Error(error.error));
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error.message);
            if(error.error.message!==null && error.error.message!==undefined && error.error.message!=="") {
                return throwError(() => new Error(error.error.message));
            } else {
                return throwError(() => new Error("Se presento un error en la comunicacion, llamar al aministrador"));
            }
        }
        // Return an observable with a user-facing error message.
        //return throwError(() => new Error('Something bad happened; please try again later.'));
        return throwError(() => new Error(error.statusText));
      }

    private handlerCallback(request: any, callback: Function, method: string): void {
        console.log("REQUEST METHOD " + method + ": ", request);
        if (callback) {
            try {
                callback(request);
            } catch (e) {
                console.log("ERROR CALLBACK METHOD " + method + ": ", e);
            }
        }
    }

    protected headersREST(request: string): any {
        let myHeaders: any = {};

        myHeaders["Accept"] = '*/*';
        myHeaders["Access-Control-Allow-Origin"] = '*';

        if (request == "post" || request == "put") {
            myHeaders["Content-Type"] = 'application/json';
        }
        if (request == "upload") {
            myHeaders["Accept"] = '*/*';
        }

        if(this.needJwt()) {
            let token:any = localStorage.getItem("token")!==null?localStorage.getItem("token"):"";
            myHeaders["Authorization"] = token;
        }

        console.log("HEADERS=>");
        console.log(myHeaders);
        return myHeaders;
    }

    protected get<R>(endpoint: string, fn: Function = new Function): Observable<R | any> {
        console.log("URL METHOD GET: ", endpoint);
        let opts: any = {
            headers: this.headersREST('get')
        };
        return this.http.get(endpoint, opts).pipe(
            catchError(this.handleError)
        );
    }

    protected delete<R>(endpoint: string, fn: Function = new Function): Observable<R | any> {
        console.log("URL METHOD DELETE: ", endpoint);
        let opts: any = {
            headers: this.headersREST('delete')
        };
        return this.http.delete(endpoint, opts).pipe(
            catchError(this.handleError)
        );
    }

    protected post<I, R>(endpoint: string, data: I, fn: Function = new Function): Observable<R | any> {
        let opts: any = {
            headers: this.headersREST('post')
        };
        return this.http.post(endpoint, data, opts).pipe(
            catchError(this.handleError)
        );
    }

    protected put<I, R>(endpoint: string, data: I, fn: Function = new Function): Observable<R | any> {
        let opts: any = {
            headers: this.headersREST('put')
        };
        return this.http.put(endpoint, data, opts).pipe(
            catchError(this.handleError)
        );
    }


    protected xmlPost(endpoint: string, data: string, fn: Function = new Function): Observable<string | any> {
        let opts: any = {
            headers: { 
                "Content-type":"text/xml", 
                "Accept": "text/xml", 
                "Access-Control-Allow-Origin": "*" 
            },
            responseType: 'text/xml' 
        };

        if(this.needJwt()) {
            let token:any = localStorage.getItem("token")!==null?localStorage.getItem("token"):"";
            opts.headers["Authorization"] = "Bearer " + token;
        }

        return this.http.post(endpoint, data, opts).pipe(
            catchError(this.handleError)
        );
    }

    protected getPdf(endpoint: string, data: Object, fn: Function = new Function): Observable<any> {
        let opts: any = {
            headers: {
                "Access-Control-Allow-Origin": "*" 
            },
            responseType: 'blob' 
        };

        if(this.needJwt()) {
            let token:any = localStorage.getItem("token")!==null?localStorage.getItem("token"):"";
            opts.headers["Authorization"] = "Bearer " + token;
        }

        return this.http.post(endpoint, data, opts).pipe(
            catchError(this.handleError)
        );
    }

    

}