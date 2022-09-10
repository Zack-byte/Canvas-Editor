import { getArrayOfModels, getArrayOfStrings, getNumber, getObject, getString } from 'src/utils/primitives.utils';
import { ITextRunDto } from './../../interfaces/text-run-dto';

export class TextRun implements ITextRunDto {
  public font: string;
  public fontSize: number;
  public color: string;
  public start: number;
  public length: number;
  public source: string;

  constructor(o?: Partial<TextRun>) {
    const obj: Partial<TextRun> = getObject(o);
    this.font = getString(obj.font);
    this.fontSize = getNumber(obj.fontSize);
    this.color = getString(obj.color);
    this.start = getNumber(obj.start);
    this.length = getNumber(obj.length);
    this.source = getString(obj.source);

  }

}
