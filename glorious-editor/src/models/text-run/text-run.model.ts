import { getArrayOfModels, getArrayOfStrings, getNumber, getObject, getString } from 'src/utils/primitives.utils';
import { ITextRunDto } from './../../interfaces/text-run-dto';

export class TextRun implements ITextRunDto {
  public font: string;
  public fontSize: number;
  public color: string;
  public content: string[];

  constructor(o?: Partial<TextRun>) {
    const obj: Partial<TextRun> = getObject(o);
    this.font = getString(obj.font);
    this.fontSize = getNumber(obj.fontSize);
    this.color = getString(obj.color);
    this.content = getArrayOfStrings(obj.content);

  }

}
