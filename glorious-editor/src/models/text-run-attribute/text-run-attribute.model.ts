import { ITextRunAttributeDto } from "src/interfaces/text-run-attribute-dto";
import { getObject, getString } from "src/utils/primitives.utils";

export class TextRunAttribute implements ITextRunAttributeDto {
    public name: string;
    public value: string;

    constructor(o?: Partial<TextRunAttribute>) {
        const obj: Partial<TextRunAttribute> = getObject(o);
        this.name = getString(obj.name);
        this.value = getString(obj.value);

    }
}