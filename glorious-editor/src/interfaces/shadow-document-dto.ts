import { IDocumentContentDto } from "./document-content-dto";

export interface IShadowDocumentDto {
  name: string;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  font: string;
  fontSize: number;
  color: string;
  content: IDocumentContentDto;
}
