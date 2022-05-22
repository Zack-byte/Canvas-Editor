import { getObject, getArrayOfModels } from 'src/utils/primitives.utils';
import { Paragraph } from '../paragraph/paragraph.model';
import { IDocumentContentDto } from './../../interfaces/document-content-dto';


export class DocumentContent implements IDocumentContentDto {
  public content: Paragraph[];

  constructor(o?: Partial<DocumentContent>) {
    const obj: Partial<DocumentContent> = getObject(o);
    this.content = getArrayOfModels(Paragraph, obj.content);
  }
}
