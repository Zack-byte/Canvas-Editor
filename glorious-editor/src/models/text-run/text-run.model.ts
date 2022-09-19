import { getArrayOfModels, getObject, getString } from 'src/utils/primitives.utils';
import { TextRunAttribute } from '../text-run-attribute/text-run-attribute.model';
import { ITextRunDto } from './../../interfaces/text-run-dto';

export class TextRun implements ITextRunDto {
  public Text: string;
  public Attributes: TextRunAttribute[];

  constructor(o?: Partial<TextRun>) {
    const obj: Partial<TextRun> = getObject(o);
    this.Text = getString(obj.Text);
    this.Attributes = <TextRunAttribute[]>obj.Attributes?.map((attribute: any) => new TextRunAttribute(attribute));
  }

}
