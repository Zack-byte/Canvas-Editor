import { ShadowDocument } from './../constants/document';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class ApiService {
  public docxUrl = 'https://localhost:7105/PostGenerateDocx';

  constructor(private http: HttpClient) {}

  /** POST: Post Document Data to be generated to docx. */
  public postGenerateDocx(document: string): Observable<string> {
    return this.http.post<string>(this.docxUrl, document)
      .pipe(
        catchError((err: any) => {
          return this.handleError('postGenerateDocx', document);
        })
      );
  }

  public handleError(apiCall: string, request: any): Observable<any> {
    console.log(`Request Failed For API call ${apiCall} with request ${request}`);
    return of({});
  }
}
