import Page from "@Pages/Page";
import SHabbo from "@SHabbo";

class ClientPage extends Page {
    beforeBuild(): boolean {
        if (!SHabbo.isLogged()) {
            document.location.href = '/login';
            return false;
        }

        return true;
    }

    buildCSS(): void {
        require('@Assets/styles/pages/client/client.scss');
    }

    build(): HTMLElement {
        const client = document.createElement('div');
        client.classList.add('client');

        SHabbo.setHotelManager();

        client.appendChild(SHabbo.getHotelManager().getApplication().view);
        SHabbo.getHotelManager().run();

        return client;
    }
}

export default ClientPage;
