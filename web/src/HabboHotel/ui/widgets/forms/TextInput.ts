import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";

interface InputOptions {
    width?: number;
    radius?: Radius;

    max_length?: number;
}

class TextInput extends Container {
    private text: Subject<string>;
    private current_text: string;

    private submit: Subject<void>;

    private dom_input: HTMLInputElement;

    private max_length: number;

    constructor(private placeholder: string, private options?: InputOptions) {
        super();

        this.text = new Subject();
        this.current_text = '';

        this.submit = new Subject();

        this.dom_input = document.createElement('input');

        this.max_length = options?.max_length ?? 100;

        this.text.subscribe((text) => {
            this.current_text = text;

            if (this.current_text.length) {
                this._inputText.alpha = 1.0;
                this._inputText.text = this.current_text;
            } else {
                this._inputText.alpha = 0.5;
                this._inputText.text = this.placeholder;
            }
        });

        this._buildDOMInput();
        this._buildInput();
    }

    private _onKeydown(e: KeyboardEvent) {
        switch (e.key) {
            case "Enter": {
                this.dom_input.blur();
                this.submit.next();
                break;
            }

            case "Backspace": {
                if (this.current_text.length) {
                    this.text.next(this.current_text.slice(0, this.current_text.length - 1));
                }

                break;
            }

            default: {
                if (e.key.length === 1 && this.current_text.length !== this.max_length) {
                    this.text.next(this.current_text + e.key);
                }

                break;
            }
        }
    }

    private _onKeyup(): void {
        if (!this._selectorActive) {
            this._selectorActive = true;
            this._selectorFunction();
        }

        this._updateSelectorPosition();
    }

    private _onFocus(): void {
        if (!this._selectorActive) {
            this._selectorActive = true;
            this._selectorFunction();
            this._updateSelectorPosition();

            this.dom_input.style.display = 'block';
        }
    }

    private _onBlur(): void {
        if (this._selectorActive) {
            this._selectorActive = false;
            this.dom_input.style.display = 'none';
        }
    }

    private _buildDOMInput(): void {
        this.dom_input.style.width = `${this.options?.width ?? 100}px`;
        this.dom_input.style.position = 'absolute';
        this.dom_input.style.top = '-100px';
        this.dom_input.style.display = 'none';

        this.dom_input.maxLength = this.options?.max_length ?? 100;
        this.dom_input.placeholder = this.placeholder;

        document.body.append(this.dom_input);

        this.dom_input.onkeydown = (e) => this._onKeydown(e);
        this.dom_input.onkeyup = () => this._onKeyup();
        this.dom_input.onblur = () => this._onBlur();
    }

    private _inputBox: Graphics = new Graphics();

    private _textStyle: TextStyle = new TextStyle({ fontFamily: 'Roboto', fontSize: 16 });
    private _inputText: Text = new Text(this.placeholder, this._textStyle);

    private _selector: Graphics = new Graphics();
    private _selectorTime: number = 1000;
    private _selectorActive: boolean = false;

    private _selectorFunction(): void {
        if (this._selector.alpha === 0) {
            this._selector.alpha = 1;
        } else {
            this._selector.alpha = 0;
        }

        if (this._selectorActive) {
            setTimeout(() => this._selectorFunction(), this._selectorTime);
        } else if (this._selector.alpha !== 0) {
            this._selector.alpha = 0;
        }
    }

    private _updateSelectorPosition(): void {
        const new_text = this.current_text.slice(0, this.dom_input.selectionStart ?? 0);
        const texture = new Text(new_text, this._textStyle);

        this._selector.x = new_text.length ? texture.width + 12 : 12;
    }

    private _buildInput() {
        this.addChild(this._inputBox);

        const radius = this.options?.radius ?? 0;

        const leftTop = typeof radius === 'number' ? radius : radius.left_top ?? 0;
        const rightTop = typeof radius === 'number' ? radius : radius.right_top ?? 0;
        const rightBottom = typeof radius === 'number' ? radius : radius.right_bottom ?? 0;
        const leftBottom = typeof radius === 'number' ? radius : radius.left_bottom ?? 0;

        const getRadius = (radius: number): number => Math.sqrt(radius * radius / 2);

        const width = this.options?.width ?? 100;
        const height = 35;

        this._inputBox.lineStyle(1, 0x9E9E9E);
        this._inputBox.beginFill(0xFFFFFF);

        this._inputBox.drawPolygon([
            getRadius(leftTop), 0,
            width - getRadius(rightTop), 0,
            width, getRadius(rightTop),
            width, height - getRadius(rightBottom),
            width - getRadius(rightBottom), height,
            getRadius(leftBottom), height,
            0, height - getRadius(leftBottom),
            0, getRadius(leftTop),
        ]);

        this._inputBox.endFill();

        this._inputBox.addChild(this._inputText);
        this._inputBox.addChild(this._selector);

        this._inputText.alpha = 0.50;

        this._inputText.x = 12;
        this._inputText.y = this._inputBox.height / 2 - this._inputText.height / 2;

        this._selector.x = this._inputText.x;
        this._selector.y = this._inputText.y;

        this._selector.beginFill(0x000000);
        this._selector.drawRect(0, 0, 1, this._inputText.height);
        this._selector.endFill();

        this._selector.alpha = 0;

        this._inputBox.interactive = true;
        this._inputBox.cursor = 'text';

        this._inputBox.on('click', () => this.focus());
    }

    onTextChange(event: (text: string) => void) {
        this.text.subscribe((text) => event(text));
    }

    onSubmit(event: () => void) {
        this.submit.subscribe(() => event());
    }

    focus(): void {
        this._onFocus();
        this.dom_input.focus();
    }

    blur(): void {
        this.dom_input.blur();
    }

    dispose(): void {
        this.dom_input.remove();
    }
}

export default TextInput;
