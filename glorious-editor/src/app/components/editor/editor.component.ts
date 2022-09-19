import { ApiService } from 'src/services/api-services';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ShadowDocument } from 'src/models/shadow-document/shadow-document.model';
import { Selection } from 'src/utils/selection.utils';
import { ShadowBody } from 'src/models/shadow-body/shadow-body.model';
import { ShadowParagraph } from 'src/models/shadow-paragraph/shadow-paragraph.model';
import { TextRun } from 'src/models/text-run/text-run.model';
import { DocumentProperties } from 'src/models/document-properties/document-properties.model';
import { DocumentPageMargin } from 'src/models/document-page-margin/document-page-margin.model';
import { TextRunAttribute } from 'src/models/text-run-attribute/text-run-attribute.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
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
  public visualWidth = 815;
  public visualHeight = 1056;
  public cursorPosition = {
    line: 0,
    character: 0,
  };

  constructor(private apiService: ApiService) {
    this.currentDocument = new ShadowDocument();
    this.currentFontSize = 0;
    this.currentFont = 'Times New Roman';
    this.canvas = <HTMLCanvasElement>(
      document.getElementById('canvas-tile-content')
    );
    this.selection = new Selection(this, 'white');
  }

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    // This will call the cursor to the stage...this is a TODO
    //this.selection = new Selection(this, "black");

    this.setupCanvas();
    this.setupNewDocument();
    this.addEventListeners();
  }

  public addCursorToScreen(event: PointerEvent): void {
    this.selection.setVisible(true);
  }

  public addKeyModifier(e: KeyboardEvent): void {
    if (e.keyCode == 16) {
      this.shiftPressed = true;
    }
  }

  public removeKeyModifier(e: KeyboardEvent): void {
    if (e.keyCode === 16) {
      this.shiftPressed = false;
    }
  }

  public clearKeyModifiers(): void {
    this.shiftPressed = false;
  }

  public getSelection(): any {
    return this.selection;
  }

  public handleFontMetrics(char: string): void {
    var line = document.createElement('div'),
      body = document.body;
    line.style.position = 'absolute';
    line.style.whiteSpace = 'nowrap';
    line.style.font = this.currentFontSize + 'px ' + this.currentFont;
    body.appendChild(line);

    line.innerHTML = char; // It doesn't matter what text goes here
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
    var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
      this.canvas.getContext('2d')
    );
    var baselineOffset = this.baseline;
    var lineHeight = this.offsetHeight;
    var characterWidth = this.offsetWidth;
    var maxHeight = Math.ceil(this.canvas.height / lineHeight) + this.scrollTop;
    var lineCount = 0;
    var selectionRanges: any = this.selection.lineRanges();
    var selectionWidth = 0;
    ctx.font = `${this.isItalic ? 'italic ' : ''}${this.isBold ? 'bold ' : ''}${
      this.currentFontSize
    }px ${this.currentFont}`;

    // Making sure we don't render something that we won't see
    if (lineCount < maxHeight) {
      maxHeight = lineCount;
    }

    // Clearing previous iteration
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'black';

    // Looping over document lines
    for (var i = this.scrollTop; i < maxHeight; ++i) {
      var topOffset = lineHeight * (i - this.scrollTop);

      // Rendering selection for this line if one is present
      if (selectionRanges[i]) {
        ctx.fillStyle = this.selectionColor;

        // Check whether we should select to the end of the line or not
        if (selectionRanges[i][1] === true) {
          selectionWidth = this.canvas.width;
        } else {
          selectionWidth =
            (selectionRanges[i][1] - selectionRanges[i][0]) * characterWidth;
        }

        // Drawing selection
        ctx.fillRect(
          (selectionRanges[i][0] - this.scrollTop) * characterWidth,
          topOffset,
          selectionWidth,
          lineHeight
        );

        // Restoring fill color for the text
        ctx.fillStyle = 'black';
      }

      // Drawing text
      ctx.fillText(
        'test'.slice(this.scrollLeft),
        0 + 0,
        topOffset + baselineOffset + 0
      );
    }
  }

  public insertTextAtCurrentPosition(text: string): void {
    this.handleFontMetrics(text);

    this.renderDocument();
  }

  public deleteCharAtCurrentPosition(forward: boolean): void {
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
    this.selection.updateCursorStyle();
  }

  public keydown(e: KeyboardEvent): void {
    var handled = true;
    switch (e.key) {
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
    if (handled) {
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

  public handleDocxRequest(): void {
    this.getExistingDocument();
  }

  public getExistingDocument(): void {
    this.apiService
      .getDocx()
      .pipe(take(1))
      .subscribe((result: any) => {
        console.log('RAW', result);
        this.handleExistingDocumentResult(new ShadowDocument(result));
      });
  }

  public handleExistingDocumentResult(document: ShadowDocument) {
    this.currentDocument = document;
    console.log('CurrentDocument', this.currentDocument)
    this.renderExistingDocument();
  }

  public renderExistingDocument(): void {
    var ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
      this.canvas.getContext('2d')
    );
    let topOffset = 0;

    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'black';
    console.log(this.currentDocument.Body);

    this.currentDocument.Body.Paragraphs.forEach((paragraph: ShadowParagraph) => {
      let fontSize = 12;
      let bold = false;
      let color = 'black';
      let italic = false;
      let bodyMargin = this.currentDocument.Body.BodyProperties.PageMargin;
      let pageSize = this.currentDocument.Body.BodyProperties.PageSize;
      let adjustedMargin = new DocumentPageMargin();
      adjustedMargin.Bottom = ((bodyMargin.Bottom * this.visualHeight)/ pageSize.Height);
      adjustedMargin.Top = ((bodyMargin.Top * this.visualHeight) / pageSize.Height);
      console.log('Body LEFT', bodyMargin);
      console.log('visual Width', this.visualWidth);
      console.log('Page Size', pageSize);

      adjustedMargin.Left = ((bodyMargin.Left * this.visualWidth) / pageSize.Width);
      adjustedMargin.Right = ((bodyMargin.Right * this.visualWidth) / pageSize.Width);

      // Styles follow a hierarchy
      // If a particular element does not have a style, it pulls from it's closest ancestor
      // This needs to be fleshed out more in the Dto's.

      paragraph.Runs.forEach((textRun: TextRun) => {

        // We check the properties for styles first...Then Render the run.

        textRun.Attributes.forEach((attribute: TextRunAttribute) => {
          switch (attribute.Name) {
            case 'Bold':
              switch (attribute.Value) {
                case '1':
                  bold = true;
                  break;
                default:
                  bold = false;
              }
              break;
            case 'Color':
              color = `#${attribute.Value}`
              break;
            case 'FontSize':
              fontSize = parseInt(attribute.Value);
              break;
            default:
          }
        });

        ctx.font = `${italic ? 'italic ' : ''}${bold ? 'bold ' : ''}${fontSize}px ${this.currentFont}`;
        ctx.fillStyle = color;

        console.log('Margin Left', adjustedMargin.Left);
        // Drawing text
        ctx.fillText(
          textRun.Text, adjustedMargin.Left, adjustedMargin.Top + topOffset
        );
        console.log('TOP OFFSET', topOffset);
        topOffset += fontSize;
     })
    })
    
  }

  public addEventListeners(): void {
    window.addEventListener('keydown', this.keydown.bind(this), true);
    window.addEventListener('focus', this.clearKeyModifiers.bind(this), true);
    window.addEventListener('focus', this.renderDocument.bind(this), true);
    const appview = document.getElementsByClassName('appview');
    appview[0].addEventListener('click', (event: any) => {
      this.addCursorToScreen(event);
    });
  }

  public setupCanvas(): void {
    this.canvas = <HTMLCanvasElement>(
      document.getElementById('canvas-tile-content')
    );
    const ctx: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
      this.canvas.getContext('2d')
    );
    let PIXEL_RATIO = (function () {
      let dpr = window.devicePixelRatio || 1;

      const fake = <any>ctx;
      let bsr =
        fake.webkitBackingStorePixelRatio ||
        fake.mozBackingStorePixelRatio ||
        fake.msBackingStorePixelRatio ||
        fake.oBackingStorePixelRatio ||
        fake.backingStorePixelRatio ||
        1;

      return dpr / bsr;
    })();

    const w = 815;
    const h = 1056;

    this.canvas.width = w * PIXEL_RATIO;
    this.canvas.height = h * PIXEL_RATIO;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    ctx.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0);
  }

  public setupNewDocument(): void {
    this.currentDocument = new ShadowDocument();
    this.currentDocument.Body = new ShadowBody();
    this.currentDocument.Body.BodyProperties = new DocumentProperties();
    this.currentDocument.Body.BodyProperties.PageMargin =
      new DocumentPageMargin();
    this.currentDocument.Body.BodyProperties.PageMargin.Bottom = 72;
    this.currentDocument.Body.BodyProperties.PageMargin.Left = 72;
    this.currentDocument.Body.BodyProperties.PageMargin.Top = 72;
    this.currentDocument.Body.BodyProperties.PageMargin.Right = 72;
    this.currentDocument.Body.BodyProperties.PageMargin.Header = 0;
    this.currentDocument.Body.BodyProperties.PageMargin.Footer = 0;
    this.currentDocument.Body.Paragraphs = [new ShadowParagraph()];
    this.currentDocument.Body.Paragraphs[0].Runs = [new TextRun()];
  }
}
