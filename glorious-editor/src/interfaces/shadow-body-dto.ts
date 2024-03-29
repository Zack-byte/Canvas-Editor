import { ShadowParagraph } from "src/models/shadow-paragraph/shadow-paragraph.model";
import { IDocumentPropertiesDto } from "./document-properties-dto";

export interface IShadowBodyDto {
    Paragraphs: ShadowParagraph[];
    BodyProperties: IDocumentPropertiesDto;
}