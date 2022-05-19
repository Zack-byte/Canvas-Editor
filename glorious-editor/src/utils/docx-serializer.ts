import * as archiver from "archiver";
import { createWriteStream, readFile } from "fs";
import { ShadowDocument } from "src/constants/document";

export class DocxSerializer {

  private documentRelXml = '';
  private fontTableRelXml = '';
  private rootRelXml = '';
  private documentXml = '';
  private fontTableXml = '';
  private numberingXml = '';
  private settingsXml = '';
  private stylesXml = '';

  public DocxSerializer() {

  }

  public serialize(document: ShadowDocument) {
    this.generateDocumentXml(document);
    this.generateFontTableXml(document);
    this.generateNumberingXml(document);
    this.generateSettingsXml(document);
    this.generateStylesXml(document);
    this.generateDocumentRelationshipsXml(document);
    this.generateFontTypeRelationshipXml(document);
    this.generateRootRelationshipsXml(document);


  }

  private generateDocumentXml(document: ShadowDocument): void {
  }

  private generateFontTableXml(document: ShadowDocument): void {

  }

  private generateNumberingXml(document: ShadowDocument): void {

  }

  private generateSettingsXml(document: ShadowDocument): void {

  }

  private generateStylesXml(document: ShadowDocument): void {

  }



  private generateRootRelationshipsXml(document: ShadowDocument): void {

  }

  private generateDocumentRelationshipsXml(document: ShadowDocument): void {

  }

  private generateFontTypeRelationshipXml(document: ShadowDocument): void {

  }

  private buildDocx(): void {

    /// Will use a combo of archiver and fs to serialize into local files for testing.

  }
}
