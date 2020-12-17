import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import clientStore from "../data/stores/clientStore";
import Client from "./Client";
import Login from "./Login";
import "./styles/SHabbo.scss";

function SHabbo() {
    const userID: number = Number(localStorage.getItem('user_id') || '0');
    const isLogged = userID > 0;

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/client"
                    render={
                        () => (
                            isLogged
                                ? <Provider store={clientStore}><Client userID={userID} /></Provider>
                                : <Redirect to="/" />
                        )
                    }
                />
                <Route
                    path="/signin"
                    render={() => isLogged ? <Redirect to="/" /> : <Login />}
                />
                <Route
                    path="/"
                    render={() => <Redirect to={isLogged ? '/client' : '/signin'} />}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default SHabbo;
