import { Application, Circle, Graphics, Sprite } from "pixi.js";
import HoverContainer from "./HoverContainer";
import { Subject } from "rxjs";

type IconButtonType = 'background' | 'transparent';

interface IconButtonProps {
    icon: string;

    hover_text: string;
    hover_icon?: string;

    background_color?: ObjectColor;
    border_color?: ObjectColor;
}

class IconButton extends HoverContainer {
    private radius: Subject<number>;

    constructor(
        type: IconButtonType,
        gameApplication: Application,
        options: IconButtonProps,
    ) {
        super(gameApplication, options.hover_text);

        this.radius = new Subject();

        const image = new Image();
        image.src = options.icon;

        if (type === 'background') {
            if (!options.background_color) {
                throw new Error('You must set the background color.');
            } else if (!options.border_color) {
                throw new Error('You must set the border color.');
            }
        }

        this.interactive = true;
        this.buttonMode = true;

        image.onload = () => {
            const sprite = Sprite.from(options.icon);

            const maxSize = [image.width, image.height].sort((a, b) => b - a)[0];
            const radius = (maxSize + 12) / 2;

            this.radius.next(radius);

            this.hitArea = new Circle(radius, radius, radius);

            sprite.x = radius - image.width / 2;
            sprite.y = radius - image.height / 2;

            if (type === 'background' && options.background_color && options.border_color) {
                const box = new Graphics();
                this.addChild(box);

                box.x = radius;
                box.y = radius;

                box.lineStyle(2, options.border_color.hex, options.border_color.alpha);
                box.beginFill(options.background_color.hex, options.background_color.alpha);
                box.drawCircle(0, 0, radius);
                box.endFill();

                this.addChild(sprite);
            }
        };
    }

    onRadiusChange(event: (radius: number) => void) {
        this.radius.subscribe((observer) => event(observer));
    }

    onClick(event: (data: any) => void) {
        this.on('click', event);
    }
}

export default IconButton;
