import { IDocumentPropertiesDto } from "src/interfaces/document-properties-dto";
import { getObject } from "src/utils/primitives.utils";
import { DocumentFooterReference } from "../document-footer-reference/document-footer-reference.model";
import { DocumentHeaderReference } from "../document-header-reference/document-header-reference.model";
import { DocumentPageMargin } from "../document-page-margin/document-page-margin.model";
import { DocumentPageNumberType } from "../document-page-number-type/document-page-number-type.model";
import { DocumentPageSize } from "../document-page-size/document-page-size.model";
import { DocumentTitlePage } from "../document-title-page/document-title-page.model";

export class DocumentProperties implements IDocumentPropertiesDto {
    public HeaderReference: DocumentHeaderReference;
    public FooterReference: DocumentFooterReference;
    public PageSize: DocumentPageSize;
    public PageMargin: DocumentPageMargin;
    public PageNumberType: DocumentPageNumberType;
    public TitlePage: DocumentTitlePage;

    constructor(o?: Partial<DocumentProperties>) {
    const obj: Partial<DocumentProperties> = getObject(o);
    this.HeaderReference = new DocumentHeaderReference(obj.HeaderReference);
    this.FooterReference = new DocumentFooterReference(obj.FooterReference);
    this.PageSize = new DocumentPageSize(obj.PageSize);
    this.PageMargin = new DocumentPageMargin(obj.PageMargin);
    this.PageNumberType = new DocumentPageNumberType(obj.PageNumberType);
    this.TitlePage = new DocumentTitlePage(obj.TitlePage);
  }


}