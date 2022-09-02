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
  public offsetHeight = 12;
  public baseline = 0;
  public canvas: HTMLCanvasElement;
  public backgroundColor = 'white';
  public selectionColor = 'lightblue';
  public scrollTop = 0;
  public scrollLeft = 0;
  public selection: Selection;
  public shiftPressed = false;
  public needsClearing = false;
  public isOpera = false;
  public isBold = false;
  public isItalic = false;
  public isUnderline = false;
  public cursorPosition = {
    line: 0,
    character: 0,
  }

  constructor(private apiService: ApiService) {
    this.currentDocument = new ShadowDocument("", {
      name: "Test Document",
      font: "Times New Roman",
      fontSize: 12,
      color: "black",
      marginBottom: 35,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 35
    });

    this.currentFontSize = this.currentDocument.fontSize;
    this.currentFont = this.currentDocument.font;
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-tile-content');
    this.selection = new Selection(this, "white");
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.selection = new Selection(this, "black");
    this.handleFontMetrics();
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas-tile-content');
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    let PIXEL_RATIO = (function () {
          let dpr = window.devicePixelRatio || 1;

          const fake = <any>ctx;
          let bsr = fake.webkitBackingStorePixelRatio ||
                fake.mozBackingStorePixelRatio ||
                fake.msBackingStorePixelRatio ||
                fake.oBackingStorePixelRatio ||
                fake.backingStorePixelRatio || 1;

        return dpr / bsr;
    })();

    const w = 1020;
    const h = 1320
    this.canvas.width = w * PIXEL_RATIO;
    this.canvas.height = h * PIXEL_RATIO;
    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";
    ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);


    window.addEventListener('keydown', this.keydown.bind(this), true);
    window.addEventListener('focus', this.clearKeyModifiers.bind(this), true);
    window.addEventListener('focus', this.renderDocument.bind(this), true);
    const appview = document.getElementsByClassName('appview');
    appview[0].addEventListener('click', (event:  any) => {
      this.addCursorToSreen(event);
    });
  }

  public addCursorToSreen(event: PointerEvent): void {
    this.selection.setVisible(true);
  }

  public addKeyModifier(e: KeyboardEvent): void {
    if (e.keyCode == 16) {
      this.shiftPressed = true;
    }
  };

  public removeKeyModifier(e: KeyboardEvent): void {
    if (e.keyCode === 16) {
      this.shiftPressed = false;
    };
  };

  public clearKeyModifiers(): void {
    this.shiftPressed = false;
  }

  public getSelection(): any {
    return this.selection;
  }

  public requestDocx(): void {
    const request = new GenerateDocxRequest({
      shadowDocument: this.currentDocument
    });

    this.apiService
    .postGenerateDocx(request)
    .pipe(take(1))
    .subscribe((result: GenerateDocxResponse) => {
    })
  }

  public handleFontMetrics(): void {
    var line = document.createElement('div'),
    body = document.body;
    line.style.position = 'absolute';
    line.style.whiteSpace = 'nowrap';
    line.style.font = this.currentFontSize + 'px ' + this.currentFont;
    body.appendChild(line);

    line.innerHTML = 'Z'; // It doesn't matter what text goes here
    this.offsetWidth = line.offsetWidth;
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
    ctx.font = `${this.isItalic ? 'italic ' : ''}${this.isBold ? 'bold ' : ''}${this.currentFontSize}px ${this.currentFont}`;

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
        this.currentDocument.getLine(i).slice(this.scrollLeft), 0 + this.currentDocument.marginLeft, topOffset + baselineOffset + this.currentDocument.marginTop
      );

      console.log('BaselineOffset', baselineOffset);
      console.log('TopOffset', topOffset);
      console.log('Document', this.currentDocument);

    }
  }


  public insertTextAtCurrentPosition(text: string): void {
    // If selection is not empty we need to "replace" selected text with inserted
    // one which means deleting old selected text before inserting new one
    if (!this.selection.isEmpty()) {
      this.deleteCharAtCurrentPosition(false);
    }

    var pos = this.selection.getPosition();

    const result = this.currentDocument.insertText(text, pos[0], pos[1]);
    // Inserting new text and changing position of cursor to a new one
    this.selection.setPosition(
      result[0], result[1], false
    );
    this.renderDocument();
  }

  public deleteCharAtCurrentPosition(forward: boolean): void {
    // If there is a selection we just remove it no matter what direction is
    if (!this.selection.isEmpty()) {

      const result = this.currentDocument.deleteRange(
          this.selection.start.character, this.selection.start.line,
          this.selection.end.character, this.selection.end.line
        );

      this.selection.setPosition(result[0], result[1], false);
    } else {
      var pos = this.selection.getPosition();
      // Deleting text and changing position of cursor to a new one
      const result = this.currentDocument.deleteChar(forward, pos[0], pos[1]);
      this.selection.setPosition(result[0], result[1], false);
    }
    this.renderDocument();
    this.selection.updateCursorStyle();
  }

  public inputFocus(): void {
    this.selection.setVisible(true);
  }

  public handleInput(e: string) {
    if (e != null) {
      this.insertTextAtCurrentPosition(e);
      this.needsClearing = true;
    }

    this.renderDocument();
    this.selection.updateCursorStyle()
  }



  public keydown(e: KeyboardEvent): void {
    var handled = true;
    switch(e.key) {
      case 'Backspace': 
        this.deleteCharAtCurrentPosition(false);
        break;
      case 'Delete': 
        this.deleteCharAtCurrentPosition(true);
        break;
      case 'Enter': 
        this.insertTextAtCurrentPosition('\n');
        break;
      case 'ArrowLeft': 
        this.selection.moveLeft(1, this.shiftPressed);
        break;
      case 'ArrowUp': 
        this.selection.moveUp(1, this.shiftPressed);
        break;
      case 'ArrowRight': 
        this.selection.moveRight(1, this.shiftPressed);
        break;
      case 'ArrowDown': 
        this.selection.moveDown(1, this.shiftPressed);
        break;
      case 'Shift':
        break;
      default:
        this.handleInput(e.key);
    }
    if(handled) {
      e.preventDefault();
    }
  }

  public handleBold(isActive: boolean): void {
    this.isBold = isActive;
  }

  public handleItalic(isActive: boolean): void {
    this.isItalic = isActive;
  }

  public handleUnderline(isActive: boolean): void {
    this.isUnderline = isActive;
  }

  public handleFontSizeChange(size: number): void {
    this.currentFontSize = size;
  }

}
