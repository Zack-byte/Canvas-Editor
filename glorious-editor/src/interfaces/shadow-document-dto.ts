import { IParagraphDto } from "./paragraph-dto";

export interface IShadowDocumentDto {
  name: string;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  font: string;
  fontSize: number;
  color: string;
  addBuffer: string;
  originalBuffer: string;
  content: IParagraphDto;
}
