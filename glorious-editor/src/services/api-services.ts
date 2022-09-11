import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ShadowDocument } from 'src/models/shadow-document/shadow-document.model';

@Injectable()
export class ApiService {
  public docxUrl = 'https://localhost:7204/Docx';

  constructor(private http: HttpClient) {}

  /** POST: Post Document Data to be generated to docx. */
  public getDocx(): Observable<any> {
    return this.http.get<any>(this.docxUrl)
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
