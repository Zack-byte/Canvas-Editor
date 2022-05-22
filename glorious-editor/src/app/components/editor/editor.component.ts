import { GenerateDocxRequest } from './../../../models/generate-docx-request/generate-docx-request.model';
import { ApiService } from 'src/services/api-services';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShadowDocument } from 'src/models/shadow-document/shadow-document.model';
import { GenerateDocxResponse } from 'src/models/generate-docx-response/generate-docx-response.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public currentDocument: ShadowDocument;

  constructor(private apiService: ApiService) {
    this.currentDocument = new ShadowDocument({
      name: "Test Document",
      font: "Times New Roman",
      fontSize: 12,
      color: "black"
    });
  }

  public ngOnInit(): void {
  }

  public requestDocx(): void {
    const request = new GenerateDocxRequest({
      shadowDocument: this.currentDocument
    });

    this.apiService
    .postGenerateDocx(request)
    .pipe(take(1))
    .subscribe((result: GenerateDocxResponse) => {
      console.log(result);
    })
  }
}
