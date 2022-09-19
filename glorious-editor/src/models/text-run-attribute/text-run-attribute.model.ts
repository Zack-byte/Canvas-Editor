import { ITextRunAttributeDto } from "src/interfaces/text-run-attribute-dto";
import { getObject, getString } from "src/utils/primitives.utils";

export class TextRunAttribute implements ITextRunAttributeDto {
    public Name: string;
    public Value: string;

    constructor(o?: Partial<TextRunAttribute>) {
        const obj: Partial<TextRunAttribute> = getObject(o);
        this.Name = getString(obj.Name);
        this.Value = getString(obj.Value);

    }
}