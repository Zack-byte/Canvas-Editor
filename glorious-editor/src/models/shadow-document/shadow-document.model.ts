import { getNumber, getObject, getString } from 'src/utils/primitives.utils';
import { DocumentContent } from '../document-content/document-content.model';
import { IShadowDocumentDto } from './../../interfaces/shadow-document-dto';
export class ShadowDocument implements IShadowDocumentDto {
  public name: string;
  public marginLeft: number;
  public marginRight: number;
  public marginTop: number;
  public marginBottom: number;
  public font: string;
  public fontSize: number;
  public color: string;
  public content: DocumentContent;

  constructor(o?: Partial<ShadowDocument>) {
    const obj: Partial<ShadowDocument> = getObject(o);
    this.name = getString(obj.name);
    this.marginLeft = getNumber(obj.marginLeft);
    this.marginRight = getNumber(obj.marginRight);
    this.marginTop = getNumber(obj.marginTop);
    this.marginBottom = getNumber(obj.marginBottom);
    this.font = getString(obj.font);
    this.fontSize = getNumber(obj.fontSize);
    this.color = getString(obj.color);
    this.content = new DocumentContent(obj.content);
  }
}
