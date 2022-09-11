import { IDocumentPropertiesDto } from "src/interfaces/document-properties-dto";
import { getObject } from "src/utils/primitives.utils";
import { DocumentFooterReference } from "../document-footer-reference/document-footer-reference.model";
import { DocumentHeaderReference } from "../document-header-reference/document-header-reference.model";
import { DocumentPageMargin } from "../document-page-margin/document-page-margin.model";
import { DocumentPageNumberType } from "../document-page-number-type/document-page-number-type.model";
import { DocumentPageSize } from "../document-page-size/document-page-size.model";
import { DocumentTitlePage } from "../document-title-page/document-title-page.model";

export class DocumentProperties implements IDocumentPropertiesDto {
    public headerReference: DocumentHeaderReference;
    public footerReference: DocumentFooterReference;
    public pageSize: DocumentPageSize;
    public pageMargin: DocumentPageMargin;
    public pageNumberType: DocumentPageNumberType;
    public titlePage: DocumentTitlePage;

    constructor(o?: Partial<DocumentProperties>) {
    const obj: Partial<DocumentProperties> = getObject(o);
    this.headerReference = new DocumentHeaderReference(obj.headerReference);
    this.footerReference = new DocumentFooterReference(obj.footerReference);
    this.pageSize = new DocumentPageSize(obj.pageSize);
    this.pageMargin = new DocumentPageMargin(obj.pageMargin);
    this.pageNumberType = new DocumentPageNumberType(obj.pageNumberType);
    this.titlePage = new DocumentTitlePage(obj.titlePage);
  }


}