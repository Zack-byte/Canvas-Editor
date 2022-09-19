import { IDocumentPageMarginDto } from "src/interfaces/document-page-margin-dto";
import { getNumber, getObject } from "src/utils/primitives.utils";

export class DocumentPageMargin implements IDocumentPageMarginDto {
    public Bottom: number;
    public Left: number;
    public Top: number;
    public Right: number;
    public Footer: number;
    public Header: number;

  constructor(o?: Partial<DocumentPageMargin>) {
    const obj: Partial<DocumentPageMargin> = getObject(o);
    this.Bottom = getNumber(obj.Bottom);
    this.Left = getNumber(obj.Left);
    this.Top = getNumber(obj.Top);
    this.Right = getNumber(obj.Right);
    this.Footer = getNumber(obj.Footer);
    this.Header = getNumber(obj.Header);
  }
}