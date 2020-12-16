import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Client from "./Client";
import Login from "./Login";
import "./styles/SHabbo.scss";

function SHabbo() {
    const userID: number = Number(localStorage.getItem('user_id') || '0');
    const isLogged = userID > 0;

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/client" render={() => isLogged ? <Client userID={userID} /> : <Redirect to="/" />} />
                <Route path="/signin" render={() => isLogged ? <Redirect to="/" /> : <Login />} />
                <Route path="/" render={() => <Redirect to={isLogged ? '/client' : '/signin'} />} />
            </Switch>
        </BrowserRouter>
    );
}

export default SHabbo;
