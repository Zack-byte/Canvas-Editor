import { IDocumentPageMarginDto } from "src/interfaces/document-page-margin-dto";
import { getNumber, getObject } from "src/utils/primitives.utils";

export class DocumentPageMargin implements IDocumentPageMarginDto {
    public bottom: number;
    public left: number;
    public top: number;
    public right: number;
    public footer: number;
    public header: number;

  constructor(o?: Partial<DocumentPageMargin>) {
    const obj: Partial<DocumentPageMargin> = getObject(o);
    this.bottom = getNumber(obj.bottom);
    this.left = getNumber(obj.left);
    this.top = getNumber(obj.top);
    this.right = getNumber(obj.right);
    this.footer = getNumber(obj.footer);
    this.header = getNumber(obj.header);
  }
}