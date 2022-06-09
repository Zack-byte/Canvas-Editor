import { GenerateDocxRequest } from './../../../models/generate-docx-request/generate-docx-request.model';
import { ApiService } from 'src/services/api-services';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShadowDocument } from 'src/models/shadow-document/shadow-document.model';
import { GenerateDocxResponse } from 'src/models/generate-docx-response/generate-docx-response.model';
import { Selection } from 'src/utils/selection.utils';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  public currentDocument: ShadowDocument;
  public currentFontSize: number;
  public currentFont: string;
  public offsetWidth = 0;
  public offsetHeight = 0;
  public baseline = 0;
  public canvas: HTMLCanvasElement;
  public backgroundColor = 'white';
  public selectionColor = 'lightblue';
  public scrollTop = 0;
  public scrollLeft = 0;
  public selection: Selection;

  constructor(private apiService: ApiService) {
    this.currentDocument = new ShadowDocument("", {
      name: "Test Document",
      font: "Times New Roman",
      fontSize: 12,
      color: "black"
    });

    this.currentFontSize = this.currentDocument.fontSize;
    this.currentFont = this.currentDocument.font;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-tile-content');
    this.selection = new Selection(this, "white");
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.selection = new Selection(this, "blue");
    this.handleFontMetrics();
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-tile-content');

    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");

    ctx.font = this.currentFontSize + 'px' + this.currentFont;
    ctx.fillText('Test', 0, this.baseline);
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

  public handleFontMetrics(): void {
    var line = document.createElement('div'),
    body = document.body;
    line.style.position = 'absolute';
    line.style.whiteSpace = 'nowrap';
    line.style.font = this.currentFontSize + 'px ' + this.currentFont;
    body.appendChild(line);

    line.innerHTML = 'm'; // It doesn't matter what text goes here
    this.offsetHeight = line.offsetWidth;
    this.offsetHeight = line.offsetHeight;

    var span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.overflow = 'hidden';
    span.style.width = '1px';
    span.style.height = '1px';
    line.appendChild(span);

    this.baseline = span.offsetTop + span.offsetHeight;
  }

  public renderDocument(): void {
    var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    var baselineOffset = this.baseline;
    var lineHeight = this.offsetHeight;
    var characterWidth = this.offsetWidth;
    var maxHeight = Math.ceil(this.canvas.height / lineHeight) + this.scrollTop;
    var lineCount = this.currentDocument.getLineCount();
    var selectionRanges: any = this.selection.lineRanges();
    var selectionWidth = 0;

    // Making sure we don't render something that we won't see
    if (lineCount < maxHeight) {
      maxHeight = lineCount;
    }

    // Clearing previous iteration
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = this.currentDocument.color;

    // Looping over document lines
    for(var i = this.scrollTop; i < maxHeight; ++i) {
      var topOffset = lineHeight * (i - this.scrollTop);

      // Rendering selection for this line if one is present
      if (selectionRanges[i]) {
        ctx.fillStyle = this.selectionColor;

        // Check whether we should select to the end of the line or not
        if(selectionRanges[i][1] === true) {
          selectionWidth = this.canvas.width;
        } else {
          selectionWidth = (selectionRanges[i][1] - selectionRanges[i][0]) * characterWidth;
        }

        // Drawing selection
        ctx.fillRect(
          (selectionRanges[i][0] - this.scrollTop) * characterWidth,
          topOffset,
          selectionWidth,
          lineHeight
        );

        // Restoring fill color for the text
        ctx.fillStyle = this.currentDocument.color;
      }

      // Drawing text
      ctx.fillText(
        this.currentDocument.getLine(i).slice(this.scrollLeft), 0, topOffset + baselineOffset
      );
    }
  }
}
