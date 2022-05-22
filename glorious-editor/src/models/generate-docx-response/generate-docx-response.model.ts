import { getObject, getString } from 'src/utils/primitives.utils';
import { IGenerateDocxResponseDto } from './../../interfaces/generate-docx-response-dto';

export class GenerateDocxResponse implements IGenerateDocxResponseDto {
  public fileName: string;

  constructor(o?: Partial<GenerateDocxResponse>) {
    const obj: Partial<GenerateDocxResponse> = getObject(o);
    this.fileName = getString(obj.fileName);
  }
}
