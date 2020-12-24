import { Application, Sprite, Text, TextStyle } from "pixi.js";
import HoverContainer from "./HoverContainer";

class CurrencyContainer extends HoverContainer {
    private text: Text;

    constructor(
        gameApplication: Application,
        hover_text: string,
        icon: string,
        amount: number,
    ) {
        super(gameApplication, hover_text, { width: 83, height: 22 });

        const iconSprite = Sprite.from(icon);
        this.addChild(iconSprite);

        iconSprite.width = 16;
        iconSprite.height = 16;

        iconSprite.y = 11 - iconSprite.height / 2;

        const textStyle = new TextStyle({
            fill: ['#FFFFFF'],
            fontSize: 12,
            letterSpacing: 0.5
        });

        this.text = new Text(amount.toString(), textStyle);
        this.addChild(this.text);

        this.text.x = 83 - this.text.width;
        this.text.y = 11 - this.text.height / 2;
    }

    changeAmount(amount: number) {
        this.text.text = amount.toString();
    }
}

export default CurrencyContainer;
