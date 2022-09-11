import { IDocumentPageSizeDto } from 'src/interfaces/document-page-size-dto';
import { getNumber, getObject } from 'src/utils/primitives.utils';

export class DocumentPageSize implements IDocumentPageSizeDto {
    public height: number;
    public width: number;

  constructor(o?: Partial<DocumentPageSize>) {
    const obj: Partial<DocumentPageSize> = getObject(o);
    this.height = getNumber(obj.height);
    this.width = getNumber(obj.width);
  }

}
