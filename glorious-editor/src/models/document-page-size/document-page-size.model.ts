import { IDocumentPageSizeDto } from 'src/interfaces/document-page-size-dto';
import { getNumber, getObject } from 'src/utils/primitives.utils';

export class DocumentPageSize implements IDocumentPageSizeDto {
    public Height: number;
    public Width: number;

  constructor(o?: Partial<DocumentPageSize>) {
    const obj: Partial<DocumentPageSize> = getObject(o);
    this.Height = getNumber(obj.Height);
    this.Width = getNumber(obj.Width);
  }

}
