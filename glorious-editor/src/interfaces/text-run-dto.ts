import { ITextRunAttributeDto } from "./text-run-attribute-dto";

export interface ITextRunDto {
  Text: string;
  Attributes: ITextRunAttributeDto[]
}
