import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.scss']
})
export class EditorControlsComponent implements OnInit {
  @Output() public docxSerialze = new EventEmitter();

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

}
