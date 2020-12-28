import ClientPage from './pages/Client';
import LoginPage from './pages/Login';
import { Observable } from 'rxjs';
import './Index.scss';

const user_id: number = Number(localStorage.getItem('user_id') || '0');
const isLogged = user_id > 0;

switch (document.location.pathname.toLowerCase()) {
    case '/client': {
        if (!isLogged) {
            document.location.href = '/';
            break;
        }

        ClientPage();
        break;
    }

    case '/login': {
        if (isLogged) {
            document.location.href = '/';
            break;
        }

        LoginPage();
        break;
    }

    default: {
        document.location.href = `/${isLogged ? 'client' : 'login'}`;
        break;
    }
}

export const onResize = new Observable((suscriber) => {
    window.onresize = () => {
        suscriber.next();
    };
});
