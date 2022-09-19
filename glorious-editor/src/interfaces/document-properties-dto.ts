import { IDocumentFooterReferenceDto } from "./document-footer-reference-dto";
import { IDocumentHeaderReferenceDto } from "./document-header-reference-dto";
import { IDocumentPageMarginDto } from "./document-page-margin-dto";
import { IDocumentPageNumberTypeDto } from "./document-page-number-type-dto";
import { IDocumentPageSizeDto } from "./document-page-size-dto";
import { IDocumentTitlePageDto } from "./document-title-page-dto";

export interface IDocumentPropertiesDto {
    HeaderReference: IDocumentHeaderReferenceDto;
    FooterReference: IDocumentFooterReferenceDto;
    PageSize: IDocumentPageSizeDto;
    PageMargin: IDocumentPageMarginDto;
    PageNumberType: IDocumentPageNumberTypeDto;
    TitlePage: IDocumentTitlePageDto;
}