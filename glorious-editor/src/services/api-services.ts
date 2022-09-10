import { GenerateDocxResponse } from './../models/generate-docx-response/generate-docx-response.model';
import { GenerateDocxRequest } from './../models/generate-docx-request/generate-docx-request.model';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class ApiService {
  public docxUrl = 'https://localhost:7204/Docx';

  constructor(private http: HttpClient) {}

  /** POST: Post Document Data to be generated to docx. */
  public getDocx(): Observable<string> {
    return this.http.get<string>(this.docxUrl)
      .pipe(
        catchError((err: any) => {
          return this.handleError('postGenerateDocx', err);
        })
      );
  }

  public handleError(apiCall: string, err: any): Observable<any> {
    console.log(`Request Failed For API call ${apiCall}`);
    console.log(`Error Code Returned: >>> ${err}`)
    return of({});
  }
}
