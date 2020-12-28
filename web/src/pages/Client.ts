import HotelManager from "../HabboHotel/HotelManager";

function ClientPage() {
    require('./styles/Client.scss');

    const hotelManager = new HotelManager();
    hotelManager.run();

    const clientPage = document.createElement('div');
    clientPage.classList.add('client');
    clientPage.id = 'clientPage';

    clientPage.append(HotelManager.getCanvas().view);
    document.body.append(clientPage);
}

export default ClientPage;
