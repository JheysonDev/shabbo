import Component from "../Component";
import HotelManager from "../../../HotelManager";
import HabboContainer from "../../widgets/HabboContainer";
import CurrencyContainer from "../../widgets/header/CurrencyContainer";

import CreditIcon from "../../images/header/credits.png";
import DiamondIcon from "../../images/header/diamonds.png";

class Header extends Component {
    build(): boolean {
        const user = HotelManager.getUserManager();

        this.container = new HabboContainer(198, 30);

        this.container.x = this.screenWidth / 2 - this.container.width / 2;
        this.container.y = 4;
        this.container.zIndex = 1000;

        const { credits, diamonds } = user.getData();

        const creditsContainer = new CurrencyContainer('Credits', CreditIcon, credits);
        this.container.addChild(creditsContainer);

        creditsContainer.x = 8;
        creditsContainer.y = 4;

        const diamondsContainer = new CurrencyContainer('Diamonds', DiamondIcon, diamonds);
        this.container.addChild(diamondsContainer);

        diamondsContainer.x = creditsContainer.width + creditsContainer.x + 16;
        diamondsContainer.y = 4;

        user.onCurrencyChange(() => {
            const { credits, diamonds } = user.getData();

            creditsContainer.changeAmount(credits);
            diamondsContainer.changeAmount(diamonds);
        });

        return this.addToMain();
    }
}

export default Header;
