import { IDocumentPropertiesDto } from "src/interfaces/document-properties-dto";
import { IShadowBodyDto } from "src/interfaces/shadow-body-dto";
import { getArrayOfModels, getObject } from "src/utils/primitives.utils";
import { DocumentProperties } from "../document-properties/document-properties.model";
import {  ShadowParagraph } from "../paragraph/shadow-paragraph.model";

export class ShadowBody implements IShadowBodyDto {
  public Paragraphs: ShadowParagraph[];
  public BodyProperties: DocumentProperties;

  constructor(o?: Partial<ShadowBody>) {
    const obj: Partial<ShadowBody> = getObject(o);
    this.Paragraphs = getArrayOfModels(ShadowParagraph, obj.Paragraphs);
    this.BodyProperties = new DocumentProperties(obj.BodyProperties);
  }
}
