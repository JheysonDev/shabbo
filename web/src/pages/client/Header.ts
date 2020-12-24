import clientStore from "../../data/stores/clientStore";
import { Application } from "pixi.js";
import CreditIcon from "../../assets/images/icons/credits.png";
import DiamondIcon from "../../assets/images/icons/diamonds.png";
import HabboContainer from "../../components/client/HabboContainer";
import CurrencyContainer from "../../components/client/CurrencyContainer";

function Header(gameApplication: Application) {
    const currenciesBox = new HabboContainer(198, 30);
    gameApplication.stage.addChild(currenciesBox);

    currenciesBox.x = gameApplication.screen.width / 2 - currenciesBox.width / 2;
    currenciesBox.y = 4;
    currenciesBox.zIndex = 100;

    const { user } = (clientStore.getState() as IClientStates).user;
    const { currency } = user;

    if (currency) {
        const creditsBox = new CurrencyContainer(gameApplication, 'Credits', CreditIcon, currency.credits);
        currenciesBox.addChild(creditsBox);

        creditsBox.x = 8;
        creditsBox.y = 4;

        const diamondsBox = new CurrencyContainer(gameApplication, 'Diamonds', DiamondIcon, currency.diamonds);
        currenciesBox.addChild(diamondsBox);

        diamondsBox.x = creditsBox.x + creditsBox.width + 16;
        diamondsBox.y = 4;

        clientStore.subscribe(() => {
            const { user } = (clientStore.getState() as IClientStates).user;
            const { currency } = user;

            if (currency) {
                creditsBox.changeAmount(currency.credits);
                diamondsBox.changeAmount(currency.diamonds);
            }
        });
    }
}

export default Header;
