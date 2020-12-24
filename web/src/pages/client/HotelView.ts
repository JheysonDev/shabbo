import { onResize } from "../../Index";
import { Application, Sprite } from "pixi.js";

// Assets
import HotelViewGradientImage from "../../assets/images/hotelview_gradient.png";
import HotelViewLeftImage from "../../assets/images/hotelview_left.png";
import HotelViewRightImage from "../../assets/images/hotelview_right.png";

function HotelView(gameApplication: Application) {
    const gradients: Sprite[] = [];
    let lastWidth = gameApplication.screen.width;

    for (let i = 0; i < gameApplication.screen.width; i++) {
        const sprite = Sprite.from(HotelViewGradientImage);
        gameApplication.stage.addChild(sprite);

        sprite.name = `hotelview_gradient_${i}`;
        sprite.zIndex = 1;

        sprite.x = i;
        sprite.y = 0;

        gradients.push(sprite);
    }

    const leftImage = new Image();
    leftImage.src = HotelViewLeftImage;

    const leftSprite = Sprite.from(HotelViewLeftImage);
    gameApplication.stage.addChild(leftSprite);

    leftSprite.name = 'hotelview_left';
    leftSprite.zIndex = 2;

    leftImage.onload = () => {
        leftSprite.x = 0;
        leftSprite.y = gameApplication.screen.height - leftImage.height;
    };

    const rightImage = new Image();
    rightImage.src = HotelViewRightImage;

    const rightSprite = Sprite.from(HotelViewRightImage);
    gameApplication.stage.addChild(rightSprite);

    rightSprite.name = 'hotelview_right';
    rightSprite.zIndex = 2;

    rightImage.onload = () => {
        rightSprite.x = gameApplication.screen.width - rightImage.width;
        rightSprite.y = gameApplication.screen.height - rightImage.height;
    };

    onResize.subscribe(() => {
        if (lastWidth < gameApplication.screen.width) {
            for (let i = lastWidth; i < gameApplication.screen.width; i++) {
                const sprite = Sprite.from(HotelViewGradientImage);
                gameApplication.stage.addChild(sprite);

                sprite.name = `hotelview_gradient_${i}`;
                sprite.zIndex = 1;

                sprite.x = i;
                sprite.y = 0;

                gradients.push(sprite);
            }

            gameApplication.stage.removeChild(rightSprite);
            gameApplication.stage.addChild(rightSprite);

            lastWidth = gameApplication.screen.width;
        }

        leftSprite.y = gameApplication.screen.height - leftImage.height;

        rightSprite.x = gameApplication.screen.width - rightImage.width;
        rightSprite.y = gameApplication.screen.height - rightImage.height;
    });
}

export default HotelView;
