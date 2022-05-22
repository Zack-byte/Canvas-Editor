import { ITextRunDto } from "./text-run-dto";

export interface IParagraphDto {
  number: number;
  font: string;
  fontSize: number;
  content: ITextRunDto[];
}
