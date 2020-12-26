import { Container, Graphics, Text, TextStyle } from "pixi.js";
import { Subject } from "rxjs";

interface InputOptions {
    width?: number;
}

class Input extends Container {
    private text: Subject<string>;
    private current_text: string;

    private submit: Subject<void>;

    private dom_input: HTMLInputElement;

    constructor(private placeholder: string, private options?: InputOptions) {
        super();

        this.text = new Subject();
        this.current_text = '';

        this.submit = new Subject();

        this.dom_input = document.createElement('input');

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

    private _buildDOMInput() {
        this.dom_input.style.width = `${this.options?.width ?? 100}px`;
        this.dom_input.style.position = 'absolute';
        this.dom_input.style.top = '-100px';
        this.dom_input.style.display = 'none';

        document.body.append(this.dom_input);

        this.dom_input.addEventListener('keydown', (e) => this._onKeydown(e));
        this.dom_input.addEventListener('blur', () => this._onBlur());
    }

    private _onKeydown(e: KeyboardEvent) {
        switch (e.key) {
            case "Enter": {
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
                if (e.key.length === 1) {
                    this.text.next(this.current_text + e.key);
                } else {
                    console.log(e.key);
                }

                break;
            }
        }
    }

    private _onBlur() {
        this.dom_input.style.display = 'none';
    }

    private _textStyle = new TextStyle({ fontFamily: 'Roboto', fontSize: 16 });
    private _inputText = new Text(this.placeholder, this._textStyle);

    private _buildInput() {
        const box = new Graphics();
        this.addChild(box);

        box.lineStyle(1, 0x9E9E9E);
        box.beginFill(0xFFFFFF);
        box.drawRoundedRect(0, 0, this.options?.width ?? 100, 35, 4);
        box.endFill();

        box.addChild(this._inputText);

        this._inputText.alpha = 0.50;

        this._inputText.x = 12;
        this._inputText.y = box.height / 2 - this._inputText.height / 2;

        box.interactive = true;
        box.cursor = 'text';

        box.on('click', () => this._onClick());
    }

    private _onClick() {
        this.dom_input.style.display = 'block';
        this.dom_input.focus();
    }

    onTextChange(event: (text: string) => void) {
        this.text.subscribe((text) => event(text));
    }

    onSubmit(event: () => void) {
        this.submit.subscribe(() => event());
    }
}

export default Input;
