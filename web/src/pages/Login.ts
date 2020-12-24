import { API_URL } from "../utils/variables";

function LoginPage() {
    require('./styles/Login.scss');

    const body = document.body;

    const loginPage = document.createElement('div');
    loginPage.classList.add('login');

    const appName = document.createElement('h1');
    appName.innerText = 'SHabbo';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Username';

    const errorMessage = document.createElement('span');

    const loginButton = document.createElement('button');
    loginButton.innerText = 'Sign in';

    loginButton.onclick = () => {
        fetch(`${API_URL}/users/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usernameInput.value }),
        })
            .then((res) => res.json())
            .then((data) => {
                const { user_id, message } = data;

                if (user_id && user_id > 0) {
                    errorMessage.innerText = '';

                    localStorage.setItem('user_id', user_id);
                    document.location.href = '/client';
                } else if (message) {
                    errorMessage.innerText = message;
                }
            })
            .catch(() => {
                errorMessage.innerText = 'The server is down.';
            });
    };

    loginPage.append(appName);
    loginPage.append(usernameInput);
    loginPage.append(errorMessage);
    loginPage.append(loginButton);

    body.append(loginPage);
}

export default LoginPage;
