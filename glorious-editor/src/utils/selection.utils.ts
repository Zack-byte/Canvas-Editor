import { EditorComponent } from "src/app/components/editor";

export class Selection{
    public start = {
        line: 0,
        character: 0
    }

    public end = {
        line: 0,
        character: 0
    }

    public el = document.createElement('cursor');
    public visible = false;
    public blinkInterval = 800;
    public onchange = null;
    public activeEndSide = true;
    public interval: any;

    constructor(private editor: EditorComponent, private color: string) {
        this.el.style.position = 'absolute';
        this.el.style.width = '2px';
        this.el.style.height = editor.offsetHeight + 'px';
        this.el.style.backgroundColor = color;

        document.getElementById('canvas-first-page')?.appendChild(this.el);
        this.setPosition(0, 0, false);
    }

    public blink(): void {
        if (parseInt(this.el.style.opacity, 10)) {
            this.el.style.opacity = '0';
        } else {
            this.el.style.opacity = '1';
        } 
    }

    public lineRanges(): {} {
        if (this.isEmpty()) {
            return {};
        }
        let ranges: any = {};
        let character = this.start.character;
        let line = this.start.line;

        for(; line <= this.end.line ; line++) {
            ranges[line] = ([character, line !== this.end.line || this.end.character]);
            character = 0;
        }
        return ranges;
    }
    
    public comparePosition(one: {line: number, character: number}, two: {line: number, character: number}): number {
        if (one.line < two.line) {
            return -1;
        } else if (one.line > two.line) {
            return 1;
        } else {
            if (one.character < two.character) {
            return -1;
            } else if (one.character > two.character) {
            return 1;
            } else {
            return 0;
            }
        }
    }

    public isEmpty(): boolean {
        return this.comparePosition(this.start, this.end) === 0;
    }

    public setPosition(character: number, line: number, keepSelection: boolean): void {

    }


    public updateCursorStyle(): void {
        // Calculating new position on the screen
        const position = this.getPosition();
        const offsetX = this.editor.currentDocument.marginLeft + ((this.editor.offsetWidth) * position[0]);
        const offsetY = this.editor.currentDocument.marginTop + (position[1] * this.editor.offsetHeight);
        this.el.style.left = offsetX + 'px';
        this.el.style.top = offsetY + 'px';

        // This helps to see moving cursor when it is always in blink on
        // state on a new position. Try to move cursror in any editor and you
        // will see this in action.
        if(this.isVisible()) {
            this.el.style.opacity = '1';
            clearInterval(this.interval);
            this.interval = setInterval(this.blink.bind(this), this.blinkInterval);
        }
    }

    public doSetPosition(character: number, line: number, keepSelection: boolean): void {
        // If this is a selection range
        if (keepSelection) {

            var compare = this.comparePosition({
            line: line,
            character: character
            }, this.start);

            // Determining whether we should make the start side of the range active
            // (have a cursor). This happens when we start the selection be moving
            // left, or moving up.
            if (compare === -1 && (this.isEmpty() || line < this.start.line)) {
            this.activeEndSide = false;
            } 

            // Assign new value to the side that is active
            if (this.activeEndSide) {
            this.end.line = line;
            this.end.character = character;
            } else {
            this.start.line = line;
            this.start.character = character;
            }

            // Making sure that end is further than start and swap if necessary
            if (this.comparePosition(this.start, this.end) > 0) {
            this.activeEndSide = !this.activeEndSide;
            var temp = {
                line: this.start.line,
                character: this.start.character
            };
            this.start.line = this.end.line;
            this.start.character = this.end.character;
            this.end.line = temp.line;
            this.end.character = temp.character;
            }
        } else { // Simple cursor move
            this.activeEndSide = true;
            this.start.line = this.end.line = line;
            this.start.character = this.end.character = character;
        }
    }

    public getPosition(): [number, number] {
        if (this.activeEndSide) {
            return [this.end.character, this.end.line];
        } else {
            return [this.start.character, this.start.line];
        }
    }

    public moveUp(length: number, keepSelection: boolean): void {
        arguments.length || (length = 1);
        var position = this.getPosition();
        this.setPosition(position[0], position[1] - length, keepSelection);
    }

    public moveDown(length: number, keepSelection: boolean): void {
        arguments.length || (length = 1);
        var position = this.getPosition();
        this.setPosition(position[0], position[1] + length, keepSelection);
    }

    public moveLeft(legnth: number, keepSelection: boolean): void {
        arguments.length || (length = 1);
        var position = this.getPosition();
        this.setPosition(position[0] - length, position[1], keepSelection);
    }

    public moveRight(length: number, keepSelection: boolean): void {
        arguments.length || (length = 1);
        var position = this.getPosition();
        this.setPosition(position[0] + length, position[1], keepSelection);
    };

    public setVisible(visible: boolean): void {
        clearInterval(this.interval);
        if(visible) {
            this.el.style.display = 'block';
            this.el.style.opacity = '1';
            this.interval = setInterval(this.blink.bind(this), this.blinkInterval);
        } else {
            this.el.style.display = 'none';
        }
        this.visible = visible;
    }

    public isVisible(): boolean {
        return this.visible;
    }


}