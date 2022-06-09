import { getNumber, getObject, getString } from 'src/utils/primitives.utils';
import { DocumentContent } from '../document-content/document-content.model';
import { IShadowDocumentDto } from './../../interfaces/shadow-document-dto';
export class ShadowDocument implements IShadowDocumentDto {
  public name: string;
  public marginLeft: number;
  public marginRight: number;
  public marginTop: number;
  public marginBottom: number;
  public font: string;
  public fontSize: number;
  public color: string;
  public content: DocumentContent;
  public storage;

  constructor(text: string, o?: Partial<ShadowDocument>) {
    const obj: Partial<ShadowDocument> = getObject(o);
    this.name = getString(obj.name);
    this.marginLeft = getNumber(obj.marginLeft);
    this.marginRight = getNumber(obj.marginRight);
    this.marginTop = getNumber(obj.marginTop);
    this.marginBottom = getNumber(obj.marginBottom);
    this.font = getString(obj.font);
    this.fontSize = getNumber(obj.fontSize);
    this.color = getString(obj.color);
    this.content = new DocumentContent(obj.content);
    this.storage = this.prepareText(text);
  }


  public prepareText(text: string): string[] {
      var lines = [],
      index = 0,
      newIndex;
    do {
      newIndex = text.indexOf('\n', index);
      // Adding from previous index to new one or to the end of the string
      lines.push(text.substr(index,  newIndex !== -1 ? newIndex - index + 1 : void 0));
      // next search will be after found newline
      index = newIndex + 1; 
    } while (newIndex !== -1);

    return lines;
  }

  public getLineCount(): number {
    return this.storage.length;
  }

  public getLine(index: number): string {
    return this.storage[index];
  }

  public getLength(): number {
    var sum = 0;
    for(var i = this.storage.length - 1; i >= 0; --i) {
      sum += this.storage[i].length;
    }
    
    return sum;
  }

  public insertText(text: string, column: number, row: number): [number, number] {
    // First we need to split inserting text into array lines
    let textArray = this.prepareText(text);

    // First we calculate new column position because
    // text array will be changed in the process
    var newColumn = textArray[textArray.length - 1].length;
    if (textArray.length === 1) {
      newColumn += column;
    }

    // append remainder of the current line to last line in new text
    textArray[textArray.length - 1] += this.storage[row].substr(column);

    // append first line of the new text to current line up to "column" position
    this.storage[row] = this.storage[row].substr(0, column) + textArray[0];

    // now we are ready to splice other new lines
    // (not first and not last) into our storage
    let args: [start: number, deleteCount: number, ...items: string[]] = [row + 1, 0, ...textArray.slice(1)];
    this.storage.splice.apply(this.storage, args);

    // Finally we calculate new position
    column = newColumn;
    row += textArray.length - 1;

    return [column, row];
  }

  public deleteRange(startColumn: number, startRow: number, endColumn: number, endRow: number): [number, number] {
    // Check bounds
    startRow >= 0 || (startRow = 0);
    startColumn >= 0 || (startColumn = 0);
    endRow < this.storage.length || (endRow = this.storage.length - 1);
    endColumn <= this.storage[endRow].replace('\n', '').length || (endColumn = this.storage[endRow].length);

    // Little optimization that does nothing if there's nothing to delete
    if(startColumn === endColumn && startRow === endRow) {
      return [startColumn, startRow];
    }

    // Now we append start of start row to the remainder of endRow
    this.storage[startRow] = this.storage[startRow].substr(0, startColumn) + 
                            this.storage[endRow].substr(endColumn);

    // And remove everything inbetween
    this.storage.splice(startRow + 1, endRow - startRow);

    // Return new position
    return [startColumn, startRow];
  }

  public deleteChar(forward: boolean, startColumn: number, startRow: number): [number, number] {
    let endRow = startRow;
    let endColumn = startColumn;

    if (forward) {
      var characterCount = this.storage[startRow].replace('\n', "").length;
      // If there are characters after cursor on this line we simple remove one
      if (startColumn < characterCount) {
        ++endColumn;
      }
      // if there are rows after this one we append it
      else {
        startColumn = characterCount;
        if (startRow < this.storage.length - 1) {
          ++endRow;
          endColumn = 0;
        }
      }
    }
    // Deleting backwards
    else {
      // If there are characters before the cursor on this line we simple remove one
      if (startColumn > 0) {
        --startColumn;
      }
      // if there are rwos before we append current to previous one
      else if (startRow > 0) {
        --startRow;
        startColumn = this.storage[startRow].length - 1;
      }
    }

    return this.deleteRange(startColumn, startRow, endColumn, endRow);
  }
}
