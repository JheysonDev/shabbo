import Page from "@Pages/Page";
import SHabbo from "@SHabbo";
import Axios from "axios";

class LoginPage extends Page {
    beforeBuild(): boolean {
        if (SHabbo.isLogged()) {
            document.location.href = '/client';
            return false;
        }

        return true;
    }

    buildCSS(): void {
        require('@Assets/styles/pages/home/login.scss');
    }

    build(): HTMLElement {
        const login = document.createElement('div');
        login.classList.add('login');

        const hotelName = document.createElement('h1');
        hotelName.innerHTML = SHabbo.getSetting('hotel_name', 'SHabbo');
        login.appendChild(hotelName);

        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.placeholder = 'Username';
        login.appendChild(usernameInput);

        const errorMessage = document.createElement('span');
        login.appendChild(errorMessage);

        const loginButton = document.createElement('button');
        loginButton.innerText = 'Sign in';
        login.appendChild(loginButton);

        loginButton.onclick = async () => {
            try {
                const response = await Axios.post<{ user_id: number }>(`${SHabbo.API_URL}users/signin`, { username: usernameInput.value });

                localStorage.setItem('user_id', response.data.user_id.toString());

                errorMessage.innerText = '';
                document.location.href = '/client';
            } catch (e) {
                errorMessage.innerText = e?.response?.data?.message ?? 'The server is down.';
            }
        };

        return login;
    }
}

export default LoginPage;
