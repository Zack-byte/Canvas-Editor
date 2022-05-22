import { GenerateDocxResponse } from './../models/generate-docx-response/generate-docx-response.model';
import { GenerateDocxRequest } from './../models/generate-docx-request/generate-docx-request.model';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class ApiService {
  public docxUrl = 'https://localhost:7105/PostGenerateDocx';

  constructor(private http: HttpClient) {}

  /** POST: Post Document Data to be generated to docx. */
  public postGenerateDocx(request: GenerateDocxRequest): Observable<GenerateDocxResponse> {
    return this.http.post<GenerateDocxResponse>(this.docxUrl, request)
      .pipe(
        catchError((err: any) => {
          return this.handleError('postGenerateDocx', request, err);
        })
      );
  }

  public handleError(apiCall: string, request: any, err: any): Observable<any> {
    console.log(`Request Failed For API call ${apiCall} with request ${request}`);
    console.log(`Error Code Returned: >>> ${err}`)
    return of({});
  }
}
