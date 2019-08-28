import React from 'react';
import {routes} from "../pages";
import {Route, Switch} from "react-router";
import {withRouter} from "react-router";
import history from "../utils/history";

const def = (props) => {
    const {location: {pathname: path}} = props;

    function onChangeRoute(e) {
        history.push(e.currentTarget.name);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className={`nav-item ${path === '/' ? 'active' : ''}`}>
                            <a className="nav-link" href="#"
                               onClick={onChangeRoute}
                               name={'/'}>
                                Home
                            </a>
                        </li>
                        <li className={`nav-item ${path === '/countries' || path.includes('/countries/') ? 'active' : ''}`}>
                            <a className="nav-link"
                               href="#"
                               onClick={onChangeRoute}
                               name={'/countries'}>
                                Countries
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid">
                <Switch>
                    {routes && routes.map(i => <Route key={i.key} exact={i.exact} component={i.component}
                                                      path={i.path}/>)}
                </Switch>
            </div>
        </div>
    )
};

export const DefaultLayout = React.memo(withRouter(def));