import { getNumber, getObject, getString, getArrayOfModels } from 'src/utils/primitives.utils';
import { TextRun } from '../text-run/text-run.model';
import { IParagraphDto } from './../../interfaces/paragraph-dto';


export class Paragraph implements IParagraphDto {
  public number: number;
  public font: string;
  public fontSize: number;
  public content: TextRun[];

  constructor(o?: Partial<Paragraph>) {
    const obj: Partial<Paragraph> = getObject(o);
    this.number = getNumber(obj.number);
    this.font = getString(obj.font);
    this.fontSize = getNumber(obj.fontSize);
    this.content = getArrayOfModels(TextRun, obj.content);
  };
}
