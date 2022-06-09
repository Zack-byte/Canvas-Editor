import { getObject } from 'src/utils/primitives.utils';
import { ShadowDocument } from '../shadow-document/shadow-document.model';
import { IGenerateDocxRequestDto } from './../../interfaces/generate-docx-request-dto';

export class GenerateDocxRequest implements IGenerateDocxRequestDto {
  public shadowDocument: ShadowDocument;

  constructor(o?: Partial<GenerateDocxRequest>) {
    const obj: Partial<GenerateDocxRequest> = getObject(o);
    this.shadowDocument = new ShadowDocument("", obj.shadowDocument);
  }
}
