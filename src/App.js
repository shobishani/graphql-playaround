import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {DefaultLayout} from "./layouts/DefaultLayout";
import history from "./utils/history";
import {Router} from "react-router";

const app = () => (
    <Router history={history}>
        <DefaultLayout/>
    </Router>
);

export default React.memo(app);