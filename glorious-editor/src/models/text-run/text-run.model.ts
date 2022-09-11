import { getArrayOfModels, getObject, getString } from 'src/utils/primitives.utils';
import { TextRunAttribute } from '../text-run-attribute/text-run-attribute.model';
import { ITextRunDto } from './../../interfaces/text-run-dto';

export class TextRun implements ITextRunDto {
  public text: string;
  public attributes: TextRunAttribute[];

  constructor(o?: Partial<TextRun>) {
    const obj: Partial<TextRun> = getObject(o);
    this.text = getString(obj.text);
    this.attributes = getArrayOfModels(TextRunAttribute, obj.attributes);
  }

}
