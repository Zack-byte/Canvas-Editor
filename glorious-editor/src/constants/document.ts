import { Byte } from "@angular/compiler/src/util";
import { type } from "os";

export type DocumentContent =  Paragraph | ImageItem;
export type ParagraphContent = TextRun | ImageItem;

export type ImageItem = {
  name: string,
  bytes: Byte[],
}

export type Paragraph = {
  number: number,
  font: string,
  fontSize: number,
  content: ParagraphContent[],
}

export type TextRun = {
  font: string,
  fontSize: number,
  color: string,
  content: string[],
}

export type ShadowDocument = {
  name: string,
  marginLeft: number,
  marginRight: number,
  marginTop: number,
  marginBottom: number,
  font: string,
  fontSize: number,
  color: string,
  content: DocumentContent[]
}
