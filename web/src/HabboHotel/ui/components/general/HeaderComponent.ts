import HabboContainer from "@HabboHotel/ui/widgets/HabboContainer";
import CurrencyContainer from "@HabboHotel/ui/widgets/header/CurrencyContainer";
import SHabbo from "@SHabbo";
import Component from "../Component";

// Icons
import CreditIcon from "@Assets/images/header/credits.png";
import DiamondIcon from "@Assets/images/header/diamonds.png";

class HeaderComponent extends Component {
    async build(): Promise<void> {
        this.container = new HabboContainer(198, 30);

        this.container.x = this.screenWidth / 2 - this.container.width / 2;
        this.container.y = 4;
        this.container.zIndex = 1000;

        const { credits, diamonds } = SHabbo.getHotelManager().getUserManager().getData();

        const creditsContainer = new CurrencyContainer('Credits', CreditIcon, credits);
        this.container.addChild(creditsContainer);

        creditsContainer.x = 8;
        creditsContainer.y = 4;

        const diamondsContainer = new CurrencyContainer('Diamonds', DiamondIcon, diamonds);
        this.container.addChild(diamondsContainer);

        diamondsContainer.x = creditsContainer.width + creditsContainer.x + 16;
        diamondsContainer.y = 4;

        SHabbo.getHotelManager().getUserManager().onCurrencyChange(({ credits, diamonds }) => {
            creditsContainer.changeAmount(credits);
            diamondsContainer.changeAmount(diamonds);
        });

        this.addToMain();
        this.setActive(true);
    }

    on(type: OnType, ...values: any[]): void {
        if (type === 'resize') {
            const [width, _height] = values.map(Number);
            this.container.x = width / 2 - this.container.width / 2;
        }
    }
}

export default HeaderComponent;
