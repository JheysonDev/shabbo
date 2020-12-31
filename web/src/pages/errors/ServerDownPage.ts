import Page from "@Pages/Page";

class ServerDownPage extends Page {
    build(): HTMLElement {
        const error = document.createElement('div');
        error.classList.add('error');

        return error;
    }
}

export default ServerDownPage;
