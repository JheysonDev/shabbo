import { useState } from 'react';
import Axios from 'axios';
import { API_URL } from '../utils/variables';
import './styles/Login.scss';

function Login() {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');

    function onLogin() {
        Axios.post(`${API_URL}/users/signin`, { username })
            .then((data) => {
                const { user_id } = data.data;

                localStorage.setItem('user_id', user_id);
                document.location.href = '/client';
            })
            .catch((e) => setError(e.response.data.message ?? 'The server is down.'));
    }

    return (
        <div className="login">
            <h1>SHabbo</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {error.length > 0 ? <span>{error}</span> : null}
            <button onClick={() => onLogin()}>Sign in</button>
        </div>
    );
}

export default Login;
