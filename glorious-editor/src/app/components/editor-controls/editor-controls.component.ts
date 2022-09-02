import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.scss']
})
export class EditorControlsComponent implements OnInit {
  @Output() public docxSerialze = new EventEmitter();
  @Output() public isBold = new EventEmitter<boolean>();
  @Output() public isItalic = new EventEmitter<boolean>();
  @Output() public isUnderline = new EventEmitter<boolean>();
  @Output() public fontSizeChange = new EventEmitter<number>();
  @Output() public fontChange = new EventEmitter<string>();

  public boldActive = false;
  public italicActive = false;
  public underlineActive = false;
  public textColorActive = false;
  public highlightActive = false;
  public fontSize = 12;
  public currentFont = 'Times New Roman'
  public fontActive = false;

  public fonts = [
    "Times New Roman",
    "Merriweather",
    "Arial"
  ]

  constructor() { }

  ngOnInit(): void {
  }

  public serializeToDocx(): void {
    this.docxSerialze.emit;
  }

  public toggleBold(): void {
    this.boldActive = !this.boldActive;
    this.isBold.emit(this.boldActive)
  }
  public toggleItalic(): void {
    this.italicActive = !this.italicActive;
    this.isItalic.emit(this.italicActive);
  }
  public toggleUnderline(): void {
    this.underlineActive = !this.underlineActive;
    this.isUnderline.emit(this.underlineActive);
  }

  public toggleTextColor(): void {
    this.textColorActive = !this.textColorActive;
  }

  public toggleHighlight(): void {
    this.highlightActive = !this.highlightActive;
  }

  public fontIncrease(): void {
    this.fontSize += 1;
    this.fontSizeChange.emit(this.fontSize);
  }

  public fontDecrease(): void {
    this.fontSize -= 1;
    this.fontSizeChange.emit(this.fontSize);
  }

  public handleFontChange(font: string): void {
    this.currentFont = font;
    this.fontChange.emit(font);
  }

  public toggleFontActive(): void {
    this.fontActive = !this.fontActive;
  }
}
