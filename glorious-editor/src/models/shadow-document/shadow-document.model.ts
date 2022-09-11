import { getObject } from 'src/utils/primitives.utils';
import { ShadowBody } from '../shadow-body/shadow-body.model';
import { IShadowDocumentDto } from './../../interfaces/shadow-document-dto';
export class ShadowDocument implements IShadowDocumentDto {
  public Body: ShadowBody;

  constructor(o?: Partial<ShadowDocument>) {
    const obj: Partial<ShadowDocument> = getObject(o);
    this.Body = new ShadowBody(obj.Body);
  }
}
